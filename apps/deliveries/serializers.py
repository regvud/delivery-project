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
            "sender",
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


class DeliveryConvertedFieldsSerializer(serializers.ModelSerializer):
    receiver = serializers.SerializerMethodField()
    sender = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
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

    def get_receiver(self, user):
        return user.receiver.phone

    def get_sender(self, user):
        return user.sender.phone

    def get_department(self, user):
        return user.department.general_number


class DeliveryDataSerializer(serializers.Serializer):
    receiver = serializers.CharField()
    sender = serializers.IntegerField()
    department = serializers.CharField()
    item = ItemSerializer()


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
