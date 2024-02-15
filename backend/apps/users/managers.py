from django.contrib.auth.base_user import BaseUserManager
from rest_framework.authentication import get_user_model


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_kwargs):
        if not email:
            raise ValueError("Email must be provided")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_kwargs):
        extra_kwargs.setdefault("is_superuser", True)
        extra_kwargs.setdefault("is_staff", True)
        extra_kwargs.setdefault("is_active", True)

        if not extra_kwargs["is_superuser"]:
            raise ValueError("Superuser must contain is_superuser status = True")

        if not extra_kwargs["is_staff"]:
            raise ValueError("Superuser must contain is_staff status = True")

        if not extra_kwargs["is_active"]:
            raise ValueError("Superuser must contain is_active status = True")

        user = self.create_user(email, password, **extra_kwargs)

        return user

    def change_password(self, email, password):
        user = get_user_model().objects.get(email=email)
        user.set_password(password)
        user.save()

        return user

    def change_email(self, email, new_email):
        user = get_user_model().objects.get(email=email)
        user.email = new_email
        user.save()

        return user

    def change_phone(self, email, phone):
        user = get_user_model().objects.get(email=email)
        user.phone = phone
        user.save()

        return user
