import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
  _id?: string;
  timestamp: string;
  conversationId?: string;
  isComplete?: boolean;
}

export interface Conversation {
  _id: string;
  conversationId: string;
  messages: Message[];
}

interface ConversationsContextType {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversation: Dispatch<SetStateAction<string>>;
  activeConversation: string;
}

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

export const ConversationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string>("");
  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        setActiveConversation,
        activeConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider"
    );
  }
  return context;
};
