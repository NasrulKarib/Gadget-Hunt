from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import Users

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self,request):
        access_token = request.COOKIES.get('access_token')
        refresh_token = request.COOKIES.get('refresh_token')

        if not access_token and not refresh_token:
            return None
        
        if access_token:
            try:
                token = AccessToken(access_token)
                id = token['user_id']
                user = Users.objects.get(id=id)
                
                return (user, token)
            except (InvalidToken, TokenError, Users.DoesNotExist) :
                pass

        # To generate new access token using refresh token
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                user = Users.objects.get(id=refresh['user_id'])
                new_access_token = str(refresh.access_token)

                request._new_access_token = new_access_token
                return (user, refresh)
            except (InvalidToken, TokenError, Users.DoesNotExist):
                raise AuthenticationFailed('Refresh token expired. Please log in again.')
    
        return None