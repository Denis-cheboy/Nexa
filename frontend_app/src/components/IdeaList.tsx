import { useEffect, useState } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Conversation, useConversations } from "../hooks/useIdeas";
import { Button } from "./ui/button";
import axios from "axios";
import { useChat } from "../hooks/useChat";
import ConfirmResetModal from "./ConfirmReset";

const IdeasList: React.FC<{ isNewChatModalOpen: boolean }> = ({
  isNewChatModalOpen,
}) => {
  const {
    conversations,
    setConversations,
    setActiveConversation,
    activeConversation,
  } = useConversations();
  const { setMessages } = useChat();
  const [openResetModal, setOpenResetModal] = useState(false);
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/all/conversations`
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, [isNewChatModalOpen]);

  useEffect(() => {
    const newConversationId = `NewChat-${Date.now()}`;
    if (!activeConversation) {
      setActiveConversation(newConversationId);
    } else if (activeConversation.startsWith("NewChat")) {
      setActiveConversation(activeConversation);
    } else if (conversations?.length > 0) {
      setActiveConversation(conversations[0].conversationId);
    }
  }, [conversations]);

  const handleUpdateActiveConversation = (
    activeConversationId: Conversation
  ) => {
    console.log("activeConversationId", activeConversationId);
    setActiveConversation(activeConversationId.conversationId);
    setMessages(() => activeConversationId.messages);
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/chat/conversations`
      );
      if (response.status === 200) {
        setConversations([]);
        // @ts-ignore
        setMessages([]);
        setOpenResetModal(false);
      }
    } catch (err) {
      console.log("error clearing conversations", err);
    }
  };
  return (
    <div className="w-full lg:w-80 bg-card rounded-xl shadow-md p-6 h-[77vh] overflow-y-auto custom-scrollbar">
      <div className="sticky top-0 bg-card z-10 p-3">
        <div className="flex justify-between px-1">
          <h2 className="text-xl font-bold">Saved Ideas</h2>
          <Button
            className="rounded-full"
            onClick={() => setOpenResetModal(true)}
          >
            Reset Chats
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {conversations?.length > 0 &&
          conversations?.map((idea) => (
            <motion.div
              key={idea.conversationId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              // @ts-ignore
              onClick={() => handleUpdateActiveConversation(idea)}
              className={`bg-muted p-4 rounded-lg mb-4 cursor-pointer ${
                activeConversation === idea.conversationId
                  ? "border-2 border-primary"
                  : ""
              }`}
            >
              <h3 className="font-semibold">
                {idea?.conversationId?.split?.("-")?.[0]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {idea?.messages?.[idea?.messages?.length - 2]?.content}
              </p>
            </motion.div>
          ))}
      </AnimatePresence>
      <ConfirmResetModal
        isOpen={openResetModal}
        onClose={() => setOpenResetModal(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default IdeasList;
