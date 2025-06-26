import * as React from "react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          AI Brainstorming Assistant
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="secondary" onClick={onNewChat}>
            New Chat
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
