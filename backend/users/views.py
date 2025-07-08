from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Users
from .serializers import UserSerializer, UserLoginSerializer, UserProfileSerializer, UserProfileUpdateSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from firebase_admin import auth
import uuid

# Create your views here.
class SignupView(APIView):

    @swagger_auto_schema(
        operation_description="Register a new user and return JWT tokens.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password', 'name'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email', description='User email address', example='user@example.com'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password (minimum 8 characters)', example='Secret123'),
                'name': openapi.Schema(type=openapi.TYPE_STRING, description='Full name of the user', example='User'),
                'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role (Admin or Customer)', default='Customer', example='Customer'),
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
                                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email'),
                                'name': openapi.Schema(type=openapi.TYPE_STRING),
                                'role': openapi.Schema(type=openapi.TYPE_STRING),
                                'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time'),
                            }
                        )
                    }
                )
            ),
            400: openapi.Response(
                description="Invalid input data",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        "errors": openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            additional_properties=openapi.Schema(type=openapi.TYPE_STRING),
                            description="Validation error details"
                        )
                    }
                )
            )
        }
    )

    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() # Deserialize the data and save it to the database
            print(user)
            response = Response({
                'user': serializer.data
            },status=status.HTTP_201_CREATED)

            
            return response
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):

    @swagger_auto_schema(
        operation_description="Log in a user and set JWT tokens in HttpOnly cookies.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email address', example='user@example.com'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password', example='secret123'),
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
            400: openapi.Response(
                description="Invalid credentials",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(type=openapi.TYPE_STRING, description='Error message', example='Invalid email or password')
                    }
                )
            )
        }
    )

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            print(user)
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
                samesite= 'None',
                max_age= 3600,
            )

            response.set_cookie(
                key= 'refresh_token',
                value= str(refresh),
                httponly=True,
                secure=True,
                samesite= 'None',
                max_age= 604800,
            )
            return response 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetProfileView(APIView):

    permission_classes = [IsAuthenticated]

      
    @swagger_auto_schema(
        operation_description="Retrieve the profile information of the authenticated user.",
        responses={
            200: openapi.Response(
                description="User profile retrieved successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message', example="User profile retrieved successfully"),
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER, description='User ID', example=1),
                                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email', description='User email', example='user@example.com'),
                                'name': openapi.Schema(type=openapi.TYPE_STRING, description='User name', example='John Doe'),
                                'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role', example='Customer'),
                            }
                        )
                    }
                )
            ),
            404: openapi.Response(
                description="User not found",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'details': openapi.Schema(type=openapi.TYPE_STRING, description='Error message', example="User not found")
                    }
                )
            )
        },
        security=[{'Bearer': []}]
    )

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
    
class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

        
    @swagger_auto_schema(
        operation_description="Update the profile information of the authenticated user.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING, description='User name', example='Jane Doe'),
                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email', description='User email', example='jane@example.com'),
                'phone': openapi.Schema(type=openapi.TYPE_STRING, description='User phone number', example='0123456789'),
                'address': openapi.Schema(type=openapi.TYPE_STRING, description='User address', example='123 Street, City'),
                'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role', example='Customer'),
            }
        ),
        responses={
            200: openapi.Response(
                description="Profile updated successfully",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, description='Success message', example='Profile updated successfully'),
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'name': openapi.Schema(type=openapi.TYPE_STRING, description='User name'),
                                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email', format='email'),
                                'phone': openapi.Schema(type=openapi.TYPE_STRING, description='User phone number'),
                                'address': openapi.Schema(type=openapi.TYPE_STRING, description='User address'),
                                'role': openapi.Schema(type=openapi.TYPE_STRING, description='User role'),
                            }
                        )
                    }
                )
            ),
            400: openapi.Response(
                description="Invalid input data",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'errors': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            additional_properties=openapi.Schema(type=openapi.TYPE_STRING),
                            description='Validation error messages'
                        )
                    }
                )
            ),
            404: openapi.Response(
                description="User not found",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'details': openapi.Schema(type=openapi.TYPE_STRING, description='Error message', example='User not found')
                    }
                )
            )
        },
        security=[{'Bearer': []}]  # Ensure your swagger config defines "Bearer"
    )

    def patch(self, request):
        user = request.user
        try:
            user_instance = Users.objects.get(id=user.id)
        except Users.DoesNotExist:
            return Response({'details': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileUpdateSerializer(user_instance, data=request.data, partial=True)
        if serializer.is_valid():
            updated_user = serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'user': {
                    'name': updated_user.name,
                    'email': updated_user.email,
                    'phone': updated_user.phone,
                    'address': updated_user.address,
                    'role': updated_user.role,
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class AdminDashboardView(APIView):

    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Access Admin Dashboard - requires user to have Admin role.",
        responses={
            200: openapi.Response(
                description="Welcome message for Admin",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, example="Welcome to Admin Dashboard")
                    }
                ),
            ),
            401: openapi.Response(
                description="Unauthorized - Admin access required",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, example="Admin Access required")
                    }
                )
            )
        },
        security=[{'Bearer': []}]
    )

    def get(self, request):
        user = Users.objects.get(id=request.user.id)
        role = user.role

        if role!="Admin":
            return Response({"message": "Admin Access required"}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({"message":"Welcome to Admin Dashboard"},status=status.HTTP_200_OK)
                
class FirebaseLoginView(APIView):

    @swagger_auto_schema(
        operation_description="Authenticate user with Firebase ID token. Sets JWT cookies on success.",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['id_token'],
            properties={
                'id_token': openapi.Schema(type=openapi.TYPE_STRING, description='Firebase ID token', example='eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...'),
            },
        ),
        responses={
            200: openapi.Response(
                description="Login successful, JWT tokens set in HttpOnly cookies",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, example='Login successful'),
                        'user': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(type=openapi.TYPE_INTEGER, example=123),
                                'email': openapi.Schema(type=openapi.TYPE_STRING, format='email', example='user@example.com'),
                                'name': openapi.Schema(type=openapi.TYPE_STRING, example='John Doe'),
                                'role': openapi.Schema(type=openapi.TYPE_STRING, example='Customer'),
                            }
                        )
                    }
                )
            ),
            400: openapi.Response(
                description="Bad Request - Missing or invalid ID token",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'message': openapi.Schema(type=openapi.TYPE_STRING, example='Id_token is required or Email is not found in token'),
                    }
                )
            ),
            401: openapi.Response(
                description="Unauthorized - Invalid ID token",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(type=openapi.TYPE_STRING, example='Invalid ID token'),
                    }
                )
            ),
            500: openapi.Response(
                description="Internal Server Error",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(type=openapi.TYPE_STRING, example='Unexpected error message'),
                    }
                )
            ),
        }
    )

    def post(self, request):
        id_token =  request.data.get('id_token')
        if not id_token:
            return Response({"message":"Id_token is required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            decode_token = auth.verify_id_token(id_token)
            email = decode_token.get('email')
            name = decode_token.get('name')

            if not email:
                return Response({"message":"Email is not found in token"},status=status.HTTP_400_BAD_REQUEST)

            user, created = Users.objects.get_or_create(
                email = email,
                defaults = {
                    'name': name,
                    'password': str(uuid.uuid4()),  # Generate a random password
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

            # Find this in FirebaseLoginView.post():


            # Change to:
            response.set_cookie(
                key='access_token',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,       
                samesite='None',    
                max_age=3600
            )
            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,       
                samesite='None',    
                max_age=604800
            )
            return response
        
        except auth.InvalidIdTokenError:
            return Response({'detail': 'Invalid ID token'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FirebaseSignupView(APIView):
    def post(self, request):
        # For Firebase, signup and login can be handled similarly
        # since Firebase creates the user on first sign-in
        return FirebaseLoginView.as_view()(request)