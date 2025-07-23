from .models import Notification
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.utils import timezone

class NotificationService:
    @staticmethod
    def create_notification(title, message, notification_type, recipient=None, related_object_id=None):
       
        # Save to database
        notification = Notification.objects.create(
            title=title,
            message=message,
            notification_type=notification_type,
            recipient=recipient,
            related_object_id=related_object_id
        )
        
        # Broadcast via WebSocket
        channel_layer = get_channel_layer()
        group_name = 'admin_notifications'  # Broadcast to all admins for now
        
        notification_data = {
            'id': notification.id,
            'title': notification.title,
            'message': notification.message,
            'type': notification.notification_type,
            'timestamp': notification.created_at.isoformat(),
            'read': notification.is_read,
            'related_object_id': notification.related_object_id,
        }
        
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'notification_message',
                'data': notification_data
            }
        )
        
        print(f"📨 Notification created and sent: {title}")
        return notification
    
    @staticmethod
    def notify_product_created(product):
        """Shortcut for product creation notification"""
        return NotificationService.create_notification(
            title="New Product Added",
            message=f"Product '{product.name}' has been added to the inventory",
            notification_type="product",
            related_object_id=product.uid
        )
    
    @staticmethod
    def notify_user_registered(user):
        """Shortcut for user registration notification"""
        return NotificationService.create_notification(
            title="New User Registered",
            message=f"User {user.name} ({user.email}) has registered",
            notification_type="user", 
            related_object_id=user.id
        )
    
    @staticmethod
    def notify_low_stock(product, current_stock):
        """Shortcut for low stock notification"""
        return NotificationService.create_notification(
            title="Low Stock Alert",
            message=f"Product '{product.name}' is running low (Stock: {current_stock})",
            notification_type="stock",
            related_object_id=product.uid
        )