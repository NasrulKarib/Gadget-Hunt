from rest_framework import serializers
from .models import Products, Categories

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
        read_only_fields = ['id']

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than zero.")
        return value
    
    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative.")
        return value

class ProductResponseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True) #nested serializer

    class Meta:
        model = Products
        fields = '__all__'
        read_only_fields = ['uid', 'created_at', 'updated_at']

        