from dataclasses import dataclass


@dataclass
class ItemDataclass:
    id: int
    label: str
    price: float
    size: str
    image: str


@dataclass
class DeliveryDataclass:
    id: int
    receiver: int
    item: ItemDataclass
    sender: int
    department: int
    status: str
