from django.db import models
from users.models import Users

# Create your models here.
class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('product', 'Product'),
        ('user', 'User Registration'),
        ('stock', 'Stock Alert'),
        ('category', 'Category'),
        ('order', 'Order'),
    ]

    id = models.BigAutoField(primary_key=True)  
    title = models.CharField(max_length=200)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    recipient = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    related_object_id = models.CharField(max_length=100, null=True, blank=True)
    
    class Meta:
        db_table = '"GadgetHunt"."notifications"'  # ✅ Added custom schema
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.title} - {self.notification_type}"
    