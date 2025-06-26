import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./hooks/useChat.tsx";
import { ConversationsProvider } from "./hooks/useIdeas.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatProvider>
      <ConversationsProvider>
        <ThemeProvider>
          <App />
          <Toaster />
        </ThemeProvider>
      </ConversationsProvider>
    </ChatProvider>
  </StrictMode>
);
