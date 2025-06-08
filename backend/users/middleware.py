class UpdateAccessTokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # If a new access token was generated, set it in the cookie
        if hasattr(request, '_new_access_token'):
            response.set_cookie(
                key='access_token',
                value=request._new_access_token,
                httponly=True,
                secure=True,
                samesite='Strict',
                max_age=3600
            )

        return response