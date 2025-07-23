from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
from .services import ProductService, CategoryService
import logging
from .permissions import IsAdminUser
from notifications.services import NotificationService

logger = logging.getLogger(__name__)

class ProductAPIView(APIView):
    
    def post(self, request):
    
        permission = IsAdminUser()
        if not permission.has_permission(request, self):
            return Response({
                'error': 'Admin access required.'
            }, status=status.HTTP_403_FORBIDDEN)
        
        try:
            success, data, status_code = ProductService.create_product(request.data)
            if success and status_code == status.HTTP_201_CREATED:
                try:
                    # Get the created product UID from response
                    product_uid = data.get('product', {}).get('uid')
                    product_name = data.get('product', {}).get('name', 'Unknown Product')
                    
                    if product_uid:
                        # Trigger notification
                        NotificationService.create_notification(
                            title="New Product Added",
                            message=f"Product '{product_name}' has been successfully added to the inventory",
                            notification_type="product",
                            related_object_id=str(product_uid)
                        )
                        logger.info(f"Product creation notification sent for: {product_name}")
                        
                except Exception as notification_error:
                    # Don't fail the entire request if notification fails
                    logger.error(f"Failed to send product creation notification: {notification_error}")
            
            return Response(data, status=status_code)

        except Exception as e:
            logger.error(f"Unexpected error in ProductAPIView.post: {str(e)}")
            return Response(
                {'error': 'Internal server error'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def get(self, request):
        try:
            _, data, status_code = ProductService.get_all_products()
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