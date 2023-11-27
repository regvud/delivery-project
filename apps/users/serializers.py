from rest_framework import serializers
from rest_framework.authentication import get_user_model

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "password",
            "last_login",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "last_login",
            "created_at",
            "updated_at",
        )

        extra_kwargs = {
            "password": {"write_only": True},
        }
