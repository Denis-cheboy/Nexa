import * as React from "react";
import { useTheme } from "../hooks/useTheme";
import { Switch } from "./ui/switch";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme() as {
    theme: string;
    toggleTheme: () => void;
  };

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={() => toggleTheme()}
      aria-label="Toggle dark mode"
    />
  );
};

export default ThemeToggle;
