from django.db import models

class Users(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Customer', 'Customer'),
    ]

    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=100)
    address = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Customer')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    
    @property
    def is_authenticated(self):
        return True
    
    class Meta:
        db_table = '"GadgetHunt"."users"'


class Messages(models.Model):
    id = models.BigAutoField(primary_key=True)
    sender = models.ForeignKey('Users', related_name='sent_messages', on_delete=models.SET_NULL, null=True)
    receiver = models.ForeignKey('Users', related_name='received_messages', on_delete=models.SET_NULL, null=True)
    message_text = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver} at {self.sent_at}"

    class Meta:
        db_table = '"GadgetHunt"."messages"'