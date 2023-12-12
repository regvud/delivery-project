from dataclasses import dataclass

from core.dataclasses.item_dataclass import Item


@dataclass
class Delivery:
    receiver: int
    item: Item
    sender: int
    department: int
    status: str
