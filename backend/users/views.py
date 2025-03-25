from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializers import UserSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

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
    
class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        role = request.auth.payload.get('role')

        return Response({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": role
        }, status=status.HTTP_200_OK)
    
class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = Users.objects.get(id=request.user.id)
        role = user.role

        if role!="Admin":
            return Response({"message": "Admin Access required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({"message":"Welcome to Admin Dashboard"},status=status.HTTP_200_OK)
    
class ValidateToken(APIView):
    def get(self, request):
        access_token = request.COOKIES.get('access_token')

        if not access_token:
            return Response({"message":"No access token provided"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            token = AccessToken(access_token)
            payload = token.payload
            return Response(
                {
                    "message":"Token is valid",
                    "payload": payload
                }, status=status.HTTP_200_OK
            )
        except(InvalidToken, TokenError) as e:
            return Response({"message":str(e)},status=status.HTTP_400_BAD_REQUEST)
            