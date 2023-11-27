from rest_framework import serializers
from rest_framework.authentication import get_user_model

from apps.deliveries.serializers import DeliverySerializer

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    sending = DeliverySerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "password",
            "sending",
            "last_login",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "sending",
            "last_login",
            "created_at",
            "updated_at",
        )

        extra_kwargs = {
            "password": {"write_only": True},
        }
