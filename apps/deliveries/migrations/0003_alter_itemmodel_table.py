# Generated by Django 4.2.7 on 2023-12-01 10:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0002_alter_deliverymodel_status'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='itemmodel',
            table='items',
        ),
    ]
