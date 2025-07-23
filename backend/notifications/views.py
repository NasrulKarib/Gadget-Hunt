from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .services import NotificationService
from users.models import Users

# Create your views here.

class NotificationView(APIView):

    def get(self, request):
        try:
            notifications = Notification.objects.all().order_by('-created_at')[:50]

            notification_data = []
            for notification in notifications:
                notification_data.append({
                    "id": notification.id,
                    "title": notification.title,
                    "message": notification.message,
                    "type": notification.notification_type,
                    "read": notification.is_read,
                    "timestamp": notification.created_at.isoformat(),
                    "related_object_id": notification.related_object_id
                })
            
            # ✅ Return structured response that matches frontend expectations
            return Response({
                "success": True,
                "notifications": notification_data,
                "count": len(notification_data)
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MarkNotificationReadView(APIView):

    def patch(self, request, notification_id):
        try:
            # ✅ Fix typo: object -> objects
            notification = Notification.objects.get(id=notification_id)
            notification.is_read = True
            notification.save()

            return Response({
                "success": True,
                "message": "Notification marked as read"
            })
            
        except Notification.DoesNotExist:
            return Response({
                "success": False,
                "error": "Notification not found"
            }, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class MarkAllNotificationsReadView(APIView):
    def patch(self, request):
        try:
            # Mark all notifications as read
            updated_count = Notification.objects.filter(
                is_read=False
            ).update(is_read=True)
            
            return Response({
                "success": True,
                "message": f"Marked {updated_count} notifications as read"
            })
            
        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)