from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .services import ProductService
from .permissions import IsAdminForProductCreation
import logging

logger = logging.getLogger(__name__)

class ProductAPIView(APIView):
    permission_classes = [IsAdminForProductCreation]
    
    def post(self, request):
        try:
            success, data, status_code = ProductService.create_product(request.data)
            return Response(data, status=status_code)

        except Exception as e:
            logger.error(f"Unexpected error in ProductAPIView.post: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @method_decorator(cache_page(60 * 15))  # Cache for 15 minutes
    def get(self, request):
        try:
            success, data, status_code = ProductService.get_all_products()
            return Response(data, status=status_code)

        except Exception as e:
            logger.error(f"Unexpected error in ProductAPIView.get: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProductDetailAPIView(APIView):

    def get(self, request, uid):
        try:
            success, data, status_code = ProductService.get_product_by_uid(uid)  # Fixed method name
            return Response(data, status=status_code)
        
        except Exception as e:
            logger.error(f"Error in ProductDetailAPIView.get: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            ) 