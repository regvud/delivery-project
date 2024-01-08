# Generated by Django 4.2.7 on 2023-12-18 12:11

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0003_alter_itemmodel_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='itemmodel',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=8, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(999999)]),
        ),
    ]