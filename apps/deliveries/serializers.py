from django.db.transaction import atomic
from rest_framework import serializers

from apps.deliveries.models import DeliveryModel, ItemModel
from core.services.tracking_service import TrackingService


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemModel
        fields = ("label", "price", "size")


class DeliverySerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = DeliveryModel
        fields = (
            "id",
            "item",
            "receiver",
            "department",
            "status",
        )

    @atomic
    def create(self, validated_data):
        item = validated_data.pop("item")
        item = ItemModel.objects.create(**item)

        delivery = DeliveryModel.objects.create(item=item, **validated_data)
        return delivery


class DeliveryWithSenderSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = DeliveryModel
        fields = (
            "id",
            "item",
            "sender",
            "receiver",
            "department",
            "status",
            "created_at",
            "updated_at",
        )


class DeliveryWithoutItemNestedSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryModel
        fields = (
            "id",
            "item",
            "receiver",
            "department",
            "status",
        )


class DeliveryConvertedIdToPhoneNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    item = ItemSerializer()
    sender = serializers.CharField()
    receiver = serializers.CharField()
    department = serializers.IntegerField()
    status = serializers.CharField()
    created_at = serializers.CharField()
    updated_at = serializers.CharField()
