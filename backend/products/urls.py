from django.urls import path
from .views import ProductAPIView, ProductDetailAPIView, CategoryAPIView

app_name = 'products'

urlpatterns = [
    path('products/', ProductAPIView.as_view(), name='product-create'),
    path('products/<uuid:uid>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('categories/', CategoryAPIView.as_view(), name='category-list'),
]