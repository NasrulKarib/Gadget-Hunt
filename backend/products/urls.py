from django.urls import path
from .views import ProductAPIView, ProductDetailAPIView

app_name = 'products'

urlpatterns = [
    path('products/', ProductAPIView.as_view(), name='product-create'),
    path('products/<uuid:uid>/', ProductDetailAPIView.as_view(), name='product-detail'),
]