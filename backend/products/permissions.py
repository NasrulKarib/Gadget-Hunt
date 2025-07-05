from rest_framework.permissions import BasePermission
from users.models import Users

class IsAdminForProductCreation(BasePermission):
    
    def has_permission(self, request, view):
        print(f"Request user: {request.user}")
        print(f"Request session: {dict(request.session)}")
        print(f"Session key: {request.session.session_key}")
        print(f"Cookies: {request.COOKIES}")
        # Allow GET requests (viewing products) for everyone
        if request.method == 'GET':
            return True
        
        # For POST requests (creating products), require authentication and Admin role
        if request.method == 'POST':
            
            if not request.user or not request.user.is_authenticated:
                return False
            
            try:
                user = Users.objects.get(id=request.user.id)
                return user.role == "Admin"
            except Users.DoesNotExist:
                return False
        
        # For other methods, require authentication
        return bool(request.user and request.user.is_authenticated)
