from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models

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
                regex="^(?=.*[a-z])(?=.*[A-Z]).{8,}$",
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
                regex="^(050|063|066|067|068|073|091|092|093|094|095|096|097|098|099)\d{7}$",
                message="Invalid phone number, example: 0664172591 ",
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
