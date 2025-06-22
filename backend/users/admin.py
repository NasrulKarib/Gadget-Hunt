from django.contrib import admin
from .models import Users, Messages

# Users Model
admin.site.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'role', 'created_at')  # Columns to display in the list view
    list_filter = ('role',)  # Add filters for role
    search_fields = ('email', 'name')  # Add search by email and name
    
admin.site.register(Messages)
class MessagesAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'message_text', 'sent_at', 'is_read')
    list_filter = ('is_read', 'sent_at')
    search_fields = ('message_text')

