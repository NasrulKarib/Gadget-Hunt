from rest_framework import serializers
from .models import Users
from django.contrib.auth.hashers import make_password, check_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = Users.objects.get(email=email)
            
        except Users.DoesNotExist:
            raise serializers.ValidationError("Invalid Email or Password")
        
        if user.role == 'Admin' and user.password != password:
            raise serializers.ValidationError("Invalid Email or Password")
        
        if user.role == 'Customer' and not check_password(password,user.password):
            raise serializers.ValidationError("Invalid Email or Password")
        
        data['user'] = user
        return data
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['name', 'phone',  'email', 'address', 'role']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['name', 'email', 'phone']
        extra_kwargs = {
            'email': {'read_only': True},
            'name': {'required': False},
            'phone': {'required': False},
        }
