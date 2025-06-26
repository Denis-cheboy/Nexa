import { useRef, useEffect, useCallback, useState } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useChat } from "../hooks/useChat";
import { SkeletonLoader } from "./SkeletonLoader";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../hooks/useChat";
import { useConversations } from "../hooks/useIdeas";
import { Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
const ChatInterface: React.FC = () => {
  const { messages, input, setInput, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string>("");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { activeConversation, setActiveConversation } = useConversations();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("reseting conversation");
    conversationIdRef.current = "";
  }, [activeConversation]);

  const sendMessage = useCallback(async () => {
    if (input.trim()) {
      const newMessage: Message = {
        content: input,
        role: "user",
        is_complete: true,
      };

      let currentConversationId = conversationIdRef.current;
      if (!currentConversationId) {
        if (activeConversation.startsWith("NewChat")) {
          // Generate a new conversation ID
          const id = uuidv4();
          currentConversationId = `${input.trim()}-${id}`;
          setActiveConversation(currentConversationId);
        } else {
          currentConversationId = activeConversation;
        }
      }

      conversationIdRef.current = currentConversationId;
      console.log("currentConversationId", currentConversationId);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: "",
          role: "assistant",
          is_complete: false,
        },
      ]);

      try {
        setIsLoading(true);
        console.log("we are here ");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/chat/send`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: input,
              conversationId: conversationIdRef.current,
            }),
          }
        );
        if (!response.body) return;
        // streaming response with sse
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
          console.log("Reading...");
          const result = await reader.read();
          if (result.done) break;
          const chunk = decoder.decode(result.value, { stream: true });

          setMessages((prevMessages: Message[]) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage.role === "assistant") {
              return [
                ...prevMessages.slice(0, -1),
                { ...lastMessage, content: lastMessage.content + chunk },
              ];
            } else {
              return [
                ...prevMessages,
                {
                  content: chunk,
                  role: "assistant",
                  is_complete: false,
                },
              ];
            }
          });
        }

        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage.role === "assistant") {
            return [
              ...prevMessages.slice(0, -1),
              { ...lastMessage, is_complete: true },
            ];
          }
          return prevMessages;
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error sending message:", error);
        setIsLoading(false);
      }
    }
  }, [input, messages]);

  return (
    <div className="flex-1 bg-card rounded-xl shadow-md p-6">
      <div className="h-96 overflow-y-auto mb-4 bg-muted rounded-lg p-4 custom-scrollbar ">
        {messages?.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`mb-2 p-3 rounded-full inline-block max-w-md break-words ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground ml-auto"
              }`}
            >
              {message.content}
            </div>
            {!message.is_complete && <SkeletonLoader />}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Save className="py-1 cursor-pointer " />
          </TooltipTrigger>
          <TooltipContent>
            <p>Save Conversation</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default ChatInterface;
