from dataclasses import dataclass


@dataclass
class DepartmentDataclass:
    id: int
    general_number: int
    city: str
    capacity: int
    staff_count: int
    status: bool
