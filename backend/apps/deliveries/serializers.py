from django.db.transaction import atomic
from rest_framework import serializers

from apps.deliveries.models import DeliveryModel, ImageItemModel, ItemModel
from core.dataclasses.delivery_dataclass import ItemDataclass


class ItemImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageItemModel
        fields = ("image",)


class ItemSerializer(serializers.ModelSerializer):
    image = ItemImageSerializer(many=True, required=False)

    class Meta:
        model = ItemModel
        fields = (
            "id",
            "label",
            "price",
            "size",
            "image",
        )

        read_only_fields = ("id",)

    # @atomic
    # def create(self, validated_data):
    #     image = validated_data.pop("image")[0]

    #     item: ItemDataclass = ItemModel.objects.create(**validated_data)
    #     image = ImageItemModel.objects.create(**image, item_id=item.id)
    #     return item


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
        # print("delivery_data", validated_data)
        item = validated_data.pop("item")
        image = item.pop("image")[0]

        item = ItemModel.objects.create(**item)
        image = ImageItemModel.objects.create(**image, item_id=item.id)

        validated_data["item"] = item

        delivery = DeliveryModel.objects.create(**validated_data)
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
