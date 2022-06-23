import { ReactNode, useEffect, useState } from "react";
import SidebarLayout from "../layouts/SidebarLayout";
import { Command } from "~/application/dtos/layout/Command";
import CommandPalette from "../ui/commandPalettes/CommandPalette";

interface Props {
  children: ReactNode;
  commands?: Command[];
}

export default function AppLayout({ children, commands }: Props) {
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    function onKeydown(event: any) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setShowCommandPalette(true);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  return (
    <div>
      <SidebarLayout onOpenCommandPalette={() => setShowCommandPalette(true)}>{children}</SidebarLayout>
      {commands && <CommandPalette isOpen={showCommandPalette} onClosed={() => setShowCommandPalette(false)} commands={commands} />}
    </div>
  );
}
