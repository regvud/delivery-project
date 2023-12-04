from django.db import models

from core.models import BaseModel


class DepartmentModel(BaseModel):
    class Meta:
        db_table = "departments"

    general_number = models.IntegerField()
    city = models.CharField(max_length=20)
    capacity = models.IntegerField()
    staff_count = models.IntegerField()
    status = models.BooleanField()
