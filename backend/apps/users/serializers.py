from django.db.transaction import atomic
from rest_framework import serializers
from rest_framework.authentication import get_user_model

from apps.deliveries.serializers import (
    DeliveryConvertedFieldsSerializer,
    DeliverySerializer,
)
from apps.users.models import AvatarModel
from core.services.email_service import EmailService

UserModel = get_user_model()


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ("phone",)


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarModel
        fields = (
            "id",
            "avatar",
            "user_id",
            "created_at",
            "updated_at",
        )

        read_only_fields = ("id",)

    @atomic
    def create(self, validated_data):
        return super().create(validated_data)


class UserSerializer(serializers.ModelSerializer):
    sending = DeliverySerializer(many=True, read_only=True)
    receiving = DeliverySerializer(many=True, read_only=True)
    avatar = AvatarSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            "id",
            "email",
            "phone",
            "password",
            "avatar",
            "is_staff",
            "is_superuser",
            "sending",
            "receiving",
            "last_login",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "avatar",
            "sending",
            "receiving",
            "last_login",
        )

        extra_kwargs = {
            "password": {"write_only": True},
        }

    @atomic
    def create(self, validated_data):
        print(validated_data)
        user = UserModel.objects.create_user(**validated_data)
        EmailService.register_email(user)
        return user


class UserDeliveriesSerializer(serializers.ModelSerializer):
    sending = DeliveryConvertedFieldsSerializer(many=True, read_only=True)
    receiving = DeliveryConvertedFieldsSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = ("sending", "receiving")


class UserProfileSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = (
            "email",
            "phone",
            "avatar",
            "last_login",
        )
