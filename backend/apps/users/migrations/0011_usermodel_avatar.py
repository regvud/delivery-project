# Generated by Django 4.2.7 on 2024-02-03 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_alter_usermodel_password'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='avatars/'),
        ),
    ]
