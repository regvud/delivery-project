from dataclasses import dataclass


@dataclass
class UserDataclass:
    id: int
    email: str
    password: str
    is_superuser: bool
    is_staff: bool
    is_active: bool
    phone: str
    avatar: str
