from django.db import models
import uuid

class Categories(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = '"GadgetHunt"."categories"'  

class Products(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)  # Replace id with UUID
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    category = models.ForeignKey(Categories, on_delete=models.CASCADE, related_name='products')
    brand = models.CharField(max_length=100)
    image_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = '"GadgetHunt"."products"'  

