from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializers import UserSerializer, UserLoginSerializer, UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from firebase_admin import auth
import uuid

# Create your views here.
class SignupView(APIView):


    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Register a new user and return JWT tokens.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password', 'name'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password (minimum 8 characters)'),
                'name': openapi.Schema(type=openapi.TYPE_STRING, description='Full name of the user'),
                'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role (Admin or Customer)', default='Customer'),
            },
        ),
        responses={
            201: openapi.Response(
                description="User created successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'email': openapi.Schema(type=openapi.TYPE_STRING),
                                'name': openapi.Schema(type=openapi.TYPE_STRING),
                                'role': openapi.Schema(type=openapi.TYPE_STRING),
                                'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                            }
                        )
                    }
                )
            ),
            400: "Bad Request - Invalid data"
        }
    )
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() # Deserialize the data and save it to the database
            response = Response({
                'user': serializer.data
            },status=status.HTTP_201_CREATED)

            
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        operation_description="Log in a user and set JWT tokens in HttpOnly cookies.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
            },
        ),
        responses={
            200: openapi.Response(
                description="Login successful",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Login successful'),
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                                'email': openapi.Schema(type=openapi.TYPE_STRING),
                                'name': openapi.Schema(type=openapi.TYPE_STRING),
                                'role': openapi.Schema(type=openapi.TYPE_STRING),
                            }
                        )
                    }
                )
            ),
            400: "Bad Request - Invalid credentials"
        }
    )

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)
            refresh["role"] = user.role

            response =  Response({
                "message": "Login successful",
                "user": { 
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "role": user.role,
                }
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key= 'access_token',
                value= str(refresh.access_token),
                httponly=True,
                secure=True,
                samesite= 'Strict',
                max_age= 3600
            )
            response.set_cookie(
                key= 'refresh_token',
                value= str(refresh),
                httponly=True,
                secure=True,
                samesite= 'Strict',
                max_age= 604800
            )
            return response 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            user_instance = Users.objects.get(id = user.id)
        except Users.DoesNotExist:
            return Response({'details':'User not found'}, status = status.HTTP_404_NOT_FOUND)


        serializer = UserProfileSerializer(user_instance)
        return Response({
            "message" : "User profile retrieved successfully",
            "user": serializer.data
        }, status=status.HTTP_200_OK)
    
class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = Users.objects.get(id=request.user.id)
        role = user.role

        if role!="Admin":
            return Response({"message": "Admin Access required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({"message":"Welcome to Admin Dashboard"},status=status.HTTP_200_OK)
                
class FirebaseLoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):
        id_token =  request.data.get('id_token')
        if not id_token:
            return Response({"message":"Id_token is required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            decode_token = auth.verify_id_token(id_token)
            print(decode_token)
            email = decode_token.get('email')
            name = decode_token.get('name')
            image = decode_token.get('picture')

            if not email:
                return Response({"message":"Email is not found in token"},status=status.HTTP_400_BAD_REQUEST)

            user, created = Users.objects.get_or_create(
                email = email,
                defaults = {
                    'name': name,
                    'password': str(uuid.uuid4()),  # Generate a random password
                    'image': image
                }
               
            )

            refresh = RefreshToken.for_user(user)
            refresh["role"] = user.role

            # Prepare response
            response = Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "role": user.role,
                },
            }, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,
                samesite='Strict',
                max_age=3600
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Strict',
                max_age=604800
            )

            return response
        
        except auth.InvalidIdTokenError:
            return Response({'detail': 'Invalid ID token'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FirebaseSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # For Firebase, signup and login can be handled similarly
        # since Firebase creates the user on first sign-in
        return FirebaseLoginView.as_view()(request)