from django.db import models


class SizeChoices(models.TextChoices):
    s = "small"
    m = "medium"
    l = "large"
    g = "giant"


class StatusChoices(models.TextChoices):
    in_progress = "in progress"
    recieved = "recieved"
    declined = "declined"
