from fastapi import FastAPI, HTTPException, APIRouter
from schemas.tickets import TicketResponse
from typing import Dict, List
#from schemas.auth import UserCreate, UserLogin, UserChange
#from models.user import User
#from database import get_db
import asyncio

router = APIRouter()

queues: Dict[int, List[int]] = {
    1: [],
    2: [],
    3: [],
    4: []
}

async def clear_queue(num_queue: int):
    while True:
        if queues[num_queue]:
            await asyncio.sleep(10)
            queues[num_queue].pop(0)
        else:
            await asyncio.sleep(1)

async def clear_all_queues():
    tasks = [
        asyncio.create_task(clear_queue(1)),
        asyncio.create_task(clear_queue(2)),
        asyncio.create_task(clear_queue(3)),
        asyncio.create_task(clear_queue(4)),
    ]
    await asyncio.gather(*tasks) 




ticket_counter = 1

@router.post("/create-ticket/{cabinet_id}", response_model=TicketResponse)
def create_ticket(cabinet_id: int):
    global ticket_counter

    # Проверяем, существует ли кабинет
    if cabinet_id not in queues:
        raise HTTPException(status_code=404, detail="Кабинет не найден")

    # Добавляем талон в очередь
    queues[cabinet_id].append(ticket_counter)

    #ответ
    response = TicketResponse(
        ticket_number=ticket_counter,
        cabinet=cabinet_id,
        position_in_queue=len(queues[cabinet_id])
    )

    ticket_counter += 1

    return response
