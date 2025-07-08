from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .services import ProductService, CategoryService
import logging
from .permissions import IsAdminUser

logger = logging.getLogger(__name__)

class ProductAPIView(APIView):
    
    def post(self, request):
    
        permission = IsAdminUser()
        if not permission.has_permission(request, self):
            return Response({
                'error': 'Admin access required.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        try:
            _, data, status_code = ProductService.create_product(request.data)
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
            _, data, status_code = ProductService.get_all_products()
            print(data)
            return Response(data, status=status_code)

        except Exception as e:
            logger.error(f"Unexpected error in ProductAPIView.get: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ProductDetailAPIView(APIView):

    def get(self, request, uid):
        success, data, status_code = ProductService.get_product_by_uid(uid)  # Fixed method name
        return Response(data, status=status_code)
        
class CategoryAPIView(APIView):

    def get(self, request):
        _,data,status = CategoryService.get_all_categories()
        return Response(data,status=status)