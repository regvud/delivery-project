# Generated by Django 4.2.7 on 2024-02-23 13:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_alter_usermodel_password_alter_usermodel_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='phone',
            field=models.CharField(max_length=12, unique=True, validators=[django.core.validators.RegexValidator(message='Invalid phone number, example: 0664172591 ', regex='^0(|50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\\d{9}$')]),
        ),
    ]
