# Generated by Django 5.1.7 on 2025-04-16 05:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='image',
            field=models.URLField(blank=True, null=True),
        ),
    ]
