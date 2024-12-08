from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routes import tickets
from routes.tickets import clear_all_queues
import asyncio


app = FastAPI()


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(clear_all_queues())

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router, prefix="/api", tags=["Ticket"])

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)
