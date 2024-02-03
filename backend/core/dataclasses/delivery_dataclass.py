from dataclasses import dataclass


@dataclass
class ItemDataclass:
    label: str
    price: float
    size: str
    image: str


@dataclass
class DeliveryDataclass:
    receiver: int
    item: ItemDataclass
    sender: int
    department: int
    status: str
