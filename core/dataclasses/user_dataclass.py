from dataclasses import dataclass


@dataclass
class User:
    email: str
    password: str
    is_superuser: bool
    is_staff: bool
    is_active: bool
    phone: str
