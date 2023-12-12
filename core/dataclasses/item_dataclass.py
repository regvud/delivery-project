from dataclasses import dataclass


@dataclass
class Item:
    label: str
    price: float
    size: str
