# Generated by Django 4.2.7 on 2024-02-05 14:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0007_alter_itemmodel_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemmodel',
            name='image',
        ),
    ]