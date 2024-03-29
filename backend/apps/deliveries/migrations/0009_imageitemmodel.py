# Generated by Django 4.2.7 on 2024-02-05 14:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0008_remove_itemmodel_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageItemModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('image', models.ImageField(upload_to='images/')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='image', to='deliveries.itemmodel')),
            ],
            options={
                'db_table': 'images',
            },
        ),
    ]
