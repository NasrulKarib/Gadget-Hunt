from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to only allow admin users to access.
    """
    
    def has_permission(self, request, view):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return False
        
        # Check if user is admin
        return request.user.role == 'Admin'
    
