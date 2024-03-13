from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from apps.deliveries.models import DeliveryModel
from core.dataclasses.delivery_dataclass import DeliveryDataclass


class DeliveryStatsSerializer(ModelSerializer):
    sender = serializers.SerializerMethodField()
    receiver = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    item = serializers.SerializerMethodField()

    class Meta:
        model = DeliveryModel
        fields = (
            "id",
            "sender",
            "receiver",
            "item",
            "department",
            "created_at",
        )

    def get_receiver(self, delivery: DeliveryDataclass):
        return {
            "id": delivery.receiver.id,
            "email": delivery.receiver.email,
            "phone": delivery.receiver.phone,
        }

    def get_sender(self, delivery: DeliveryDataclass):
        return {
            "id": delivery.sender.id,
            "email": delivery.sender.email,
            "phone": delivery.sender.phone,
        }

    def get_item(self, delivery: DeliveryDataclass):
        return {"id": delivery.item.id, "label": delivery.item.label}

    def get_department(self, delivery):
        return {
            "id": delivery.department.id,
            "general_number": delivery.department.general_number,
        }
