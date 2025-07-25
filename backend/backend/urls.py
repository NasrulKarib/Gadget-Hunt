from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configure Swagger schema view
schema_view = get_schema_view(
    openapi.Info(
        title="GadgetHunt API",
        default_version='v1',
        description="API documentation for GadgetHunt project",
        contact=openapi.Contact(email="contact@gadgethunt.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/', include('products.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/',schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/',schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]   

