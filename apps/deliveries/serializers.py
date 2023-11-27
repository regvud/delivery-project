from rest_framework import serializers

from apps.deliveries.models import DeliveryModel


class DeliverySerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryModel
        fields = ("id", "item", "sender", "reciever")


class DeliveryWithSenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryModel
        fields = ("id", "item", "sender", "reciever", "created_at", "updated_at")


class DeliveryUserPhoneExistanceCheckSerializer(serializers.Serializer):
    reciever = serializers.CharField()
    item = serializers.CharField()
