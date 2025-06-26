from fastapi import APIRouter, HTTPException, Body
from fastapi.responses import StreamingResponse
from typing import List
import httpx
import os

from database import db 
from models import Conversation, Message

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL =os.getenv("GEMINI_API_ENDPOINT")
router = APIRouter()


@router.get("/")
async def root():
    return {"message":"hellow welcome to fastapi"}

@router.get("/chat/all/conversations", response_model=List[Conversation])
async def get_all_conversations():
    """
    Fetches all saved conversations from the database.
    """
    conversations = await db.database.conversations.find().to_list(100) # type: ignore
    return conversations


@router.delete("/chat/conversations")
async def delete_all_conversations():
    """
    Deletes all conversations from the database.
    """    
    result = await db.database.conversations.delete_many({}) # type: ignore
    if result.acknowledged:
        return {"message": f"Successfully deleted {result.deleted_count} conversations."}
    raise HTTPException(status_code=500, detail="Failed to delete conversations.")


@router.get("/chat/history/{conversation_id}", response_model=List[Message])
async def get_conversation_history(conversation_id: str):
    """
    Fetches the message history for a specific conversation.
    """
    conversation = await db.database.conversations.find_one({"conversationId": conversation_id}) # type: ignore
    if conversation:
        return conversation.get("messages", [])
    return []



@router.post("/chat/send")
async def send_message(
    message: str = Body(..., embed=True),
    conversationId: str = Body(..., embed=True)
):
    """
    Handles sending a message to Gemini API, streaming the response, and saving the conversation.
    """
    user_message = Message(role="user", content=message)

    # Find or create conversation
    conversation = await db.database.conversations.find_one({"conversationId": conversationId}) # type: ignore
    if not conversation:
        new_conversation_data = {
            "conversationId": conversationId,
            "messages": [user_message.dict()]
        }
        await db.database.conversations.insert_one(new_conversation_data) # type: ignore
        history = [user_message]
    else:
        history = [Message(**msg) for msg in conversation.get("messages", [])]
        history.append(user_message)
        await db.database.conversations.update_one( # type: ignore
            {"conversationId": conversationId},
            {"$push": {"messages": user_message.dict()}}
        )

    # Gemini only supports text (not role-based chat), so concatenate history
    prompt = "\n".join([f"{msg.role}: {msg.content}" for msg in history])

    async def stream_gemini():
        headers = {
            "Content-Type": "application/json",
        }

        payload = {
            "contents": [
                {
                    "parts": [{"text": prompt}]
                }
            ]
        }

        try:
            async with httpx.AsyncClient(timeout=None) as client:
                response = await client.post(
                    f"{GEMINI_URL}?key={GEMINI_API_KEY}",
                    headers=headers,
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()

                full_reply = data["candidates"][0]["content"]["parts"][0]["text"]

                # Stream it chunk-by-chunk
                for chunk in full_reply.split():
                    yield chunk + " "
                
                # Save the assistant response
                assistant_message = Message(
                    role="assistant",
                    content=full_reply,
                    is_complete=True
                )
                await db.database.conversations.update_one( # type: ignore
                    {"conversationId": conversationId},
                    {"$push": {"messages": assistant_message.dict()}}
                )
        except Exception as e:
            print(f"Gemini API Error: {e}")
            yield "An error occurred."

    return StreamingResponse(stream_gemini(), media_type="text/event-stream")
