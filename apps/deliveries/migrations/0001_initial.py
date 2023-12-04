# Generated by Django 4.2.7 on 2023-12-04 11:22

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
                ('item', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='deliveries.itemmodel')),
                ('status', models.CharField(choices=[('in progress', 'In Progress'), ('ready', 'Ready'), ('received', 'Recieved'), ('declined', 'Declined')], default='in progress', max_length=11)),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deliveries', to='departments.departmentmodel')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiving', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sending', to=settings.AUTH_USER_MODEL)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'deliveries',
            },
        ),
    ]
