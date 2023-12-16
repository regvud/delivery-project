from dataclasses import dataclass


@dataclass
class DepartmentDataclass:
    general_number: int
    city: str
    capacity: int
    staff_count: int
    status: bool
