from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import Users

@receiver(post_save, sender=Users)
def set_default_role(sender, instance, created, **kwargs):
    if created and not instance.role:
        instance.role = 'Customer'
        instance.save()