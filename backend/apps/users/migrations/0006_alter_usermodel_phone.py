# Generated by Django 4.2.7 on 2024-02-03 13:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_alter_usermodel_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='phone',
            field=models.CharField(max_length=12, unique=True, validators=[django.core.validators.RegexValidator(message='Invalid phone number, example: 380664172591 ', regex='^\\+?3?8?(0\\d{9})$')]),
        ),
    ]
