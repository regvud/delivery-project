# Generated by Django 4.2.7 on 2024-02-03 13:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_usermodel_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='password',
            field=models.CharField(max_length=128, validators=[django.core.validators.RegexValidator(message='Password must contain uppercase and lowercase letters, min 8 characters.', regex='^(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9\\s]{8,}$')]),
        ),
    ]
