# Generated by Django 4.2.7 on 2023-12-16 17:03

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('departments', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=30)),
                ('price', models.DecimalField(decimal_places=2, max_digits=7, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(1000000)])),
                ('size', models.CharField(choices=[('small', 'S'), ('medium', 'M'), ('large', 'L'), ('giant', 'G')], max_length=6)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'items',
            },
        ),
        migrations.CreateModel(
            name='DeliveryModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deliveries', to='departments.departmentmodel')),
                ('status', models.CharField(choices=[('in progress', 'In Progress'), ('ready', 'Ready'), ('received', 'Received'), ('declined', 'Declined')], default='in progress', max_length=11)),
                ('item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='deliveries.itemmodel')),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'deliveries',
            },
        ),
    ]
