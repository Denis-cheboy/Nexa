import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export interface Message {
  content: string;
  role: "user" | "assistant";
  timestamp?: string;
  conversationId?: string;
  is_complete?: boolean | undefined;
}

interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  resetChat: () => void;
  setMessages: (update: (prevMessages: Message[]) => Message[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
  }, []);

  return (
    <ChatContext.Provider
      value={{ messages, input, setInput, resetChat, setMessages }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
