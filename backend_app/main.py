from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from database import connect_to_mongo, close_mongo_connection
import uvicorn
import os
app = FastAPI(
    title="AI Brainstorming Assistant API",
    description="API for the AI Brainstorming Assistant application.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000","https://nexa-1-b2ub.onrender.com"], # Add your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

# Add startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
