from pydantic import BaseModel
from typing import Optional


class TicketResponse(BaseModel):
    ticket_number: int
    cabinet: int
    position_in_queue: int