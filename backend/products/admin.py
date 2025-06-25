from django.contrib import admin
from .models import Categories, Products

# Register your models here.
admin.site.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('uid', 'name', 'price', 'stock_quantity', 'category', 'brand')
    list_filter = ('category', 'brand')
    search_fields = ('name', 'description')

admin.site.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
