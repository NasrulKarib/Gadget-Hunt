from django.db import transaction
from rest_framework import status
from .models import Products, Categories
from .serializers import ProductCreateSerializer, ProductResponseSerializer, CategorySerializer
import logging

logger = logging.getLogger(__name__)

class ProductService:

    @staticmethod
    def create_product(data):
        try:
            if data:
                try:
                    category = Categories.objects.get(name=data['category'])
                    data['category'] = category.id
                except Categories.DoesNotExist:
                    return False, {
                        'error': 'Category does not exist'
                    }, status.HTTP_400_BAD_REQUEST
                
            serializer = ProductCreateSerializer(data = data)
            
            if not serializer.is_valid():
                return False, {
                    'error': serializer.errors,
                }, status.HTTP_400_BAD_REQUEST
            
            with transaction.atomic():
                product = serializer.save()
                response_serializer = ProductResponseSerializer(product)

                return True, {
                    'message': 'Product created successfully',
                    'product': response_serializer.data
                }, status.HTTP_201_CREATED

        except Exception as e:
            logger.error(f"Error creating product: {e}")
            return False,{
                'error': 'Failerd to create product'
            }, status.HTTP_500_INTERNAL_SERVER_ERROR
    
    def get_all_products():
        try:
            queryset = Products.objects.select_related('category').all()
            serializer = ProductResponseSerializer(queryset, many=True)

            return True, {
                'products': serializer.data
            }, status.HTTP_200_OK
            
        except Exception as e:
            logger.error(f"Error fetching products:{e}")
            return False, {
                'error': 'Failed to fetch products'
            }, status.HTTP_500_INTERNAL_SERVER_ERROR
    
    def get_particular_product(uid):
        try:
            product = Products.objects.select_related('category').get(uid=uid)
            serializer = ProductResponseSerializer(product)

            return True,{
                'product': serializer.data
            }, status.HTTP_200_OK

        except Products.DoesNotExist:
            return False,{
                'error': 'Product not found'
            }, status.HTTP_404_NOT_FOUND

        except Exception as e:
            logger.error(f"Error fetching product with uid {uid}: {e}")
            return False, {
                'error': 'Failed to fetch product'
            }, status.HTTP_500_INTERNAL_SERVER_ERROR