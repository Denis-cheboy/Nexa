import { useEffect, useState } from "react";
import Header from "./components/Header";
import ChatInterface from "./components/ChatInterface";
import IdeasList from "./components/IdeaList";
import NewChatModal from "./components/NewChatModal";
import { useChat } from "./hooks/useChat";
import { useConversations } from "./hooks/useIdeas";
import axios from "axios";

export default function App() {
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const { resetChat } = useChat();
  const { activeConversation, conversations, setActiveConversation } =
    useConversations();
  const { setMessages } = useChat();

  const handleNewChat = () => {
    const newConversationId = `NewChat-${Date.now()}`;
    console.log("newConversationId", newConversationId);
    setActiveConversation(newConversationId);
    resetChat();
    setIsNewChatModalOpen(false);
  };

  const fetchConversationMessages = async (conversationId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/chat/history/${conversationId}`
      );
      setMessages(() => response.data);
    } catch (err) {
      console.log("err fetching conversation messages", err);
    }
  };

  useEffect(() => {
    if (activeConversation) {
      const conversation = conversations?.find(
        (c) => c.conversationId === activeConversation
      );
      if (conversation) {
        fetchConversationMessages(conversation.conversationId);
      }
    }
  }, [activeConversation]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onNewChat={() => setIsNewChatModalOpen(true)} />
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <ChatInterface />
        <IdeasList isNewChatModalOpen={isNewChatModalOpen} />
      </main>
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onConfirm={handleNewChat}
      />
    </div>
  );
}
