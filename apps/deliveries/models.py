from django.db import models
from rest_framework.authentication import get_user_model

from core.models import BaseModel

UserModel = get_user_model()


class DeliveryModel(BaseModel):
    class Meta:
        db_table = "deliveries"

    reciever = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="recieving"
    )
    item = models.CharField(max_length=30)
    sender = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="sending"
    )


