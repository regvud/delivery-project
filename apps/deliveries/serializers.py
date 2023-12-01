from django.db.transaction import atomic
from rest_framework import serializers

from apps.deliveries.models import DeliveryModel, ItemModel


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
            "reciever",
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
            "reciever",
            "status",
            "created_at",
            "updated_at",
        )


class DeliveryUserPhoneExistanceCheckSerializer(serializers.Serializer):
    item = ItemSerializer()
    reciever = serializers.CharField()


class DeliveryConvertedIdToPhoneNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    item = ItemSerializer()
    sender = serializers.CharField()
    reciever = serializers.CharField()
    status = serializers.CharField()
    created_at = serializers.CharField()
    updated_at = serializers.CharField()
