from apps.deliveries.choices import StatusChoices
from core.dataclasses.delivery_dataclass import Delivery


class TrackingService:
    def __init__(self, send) -> None:
        self.send = send

    @staticmethod
    def send(delivery:Delivery):
        print(delivery)
