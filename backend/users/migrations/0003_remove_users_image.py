# Generated by Django 5.1.7 on 2025-04-16 10:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_users_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='image',
        ),
    ]
