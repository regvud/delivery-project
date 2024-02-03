from rest_framework import serializers
from rest_framework.authentication import get_user_model

from apps.deliveries.serializers import (
    DeliveryConvertedFieldsSerializer,
    DeliverySerializer,
)
from core.services.email_service import EmailService

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    sending = DeliverySerializer(many=True, read_only=True)
    receiving = DeliverySerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "phone",
            "password",
            "avatar",
            "sending",
            "receiving",
            "last_login",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "sending",
            "receiving",
            "avatar",
            "last_login",
        )

        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        EmailService.register_email(user)
        return user


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("avatar",)


class UserDeliveriesSerializer(serializers.ModelSerializer):
    sending = DeliveryConvertedFieldsSerializer(many=True, read_only=True)
    receiving = DeliveryConvertedFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = ("sending", "receiving")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("email", "phone", "last_login")
