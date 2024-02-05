from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.forms import ImageField

from apps.users.managers import UserManager
from core.models import BaseModel


class UserModel(AbstractBaseUser, PermissionsMixin, BaseModel):
    class Meta:
        db_table = "auth_user"

    email = models.EmailField(unique=True)
    password = models.CharField(
        max_length=128,
        validators=[
            RegexValidator(
                regex="^(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9\s]{8,}$",
                message="Password must contain uppercase and lowercase letters, min 8 characters.",
            ),
        ],
    )
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    phone = models.CharField(
        max_length=12,
        unique=True,
        validators=[
            RegexValidator(
                regex="^\+?3?8?(0\d{9})$",
                message="Invalid phone number, example: 380664172591 ",
            )
        ],
    )

    USERNAME_FIELD = "email"

    objects = UserManager()


class AvatarModel(BaseModel):
    class Meta:
        db_table = "avatars"

    avatar = models.ImageField(blank=True, null=True, upload_to="avatars/")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name="avatar")
