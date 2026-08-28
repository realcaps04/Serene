import { MoreHorizontal } from "lucide-react";
import { useRef, useEffect } from "react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { IconButton } from "../components/ui/Button";
import { AIMessage, ChatInput, QuickPrompt, TypingDots, UserMessage } from "../components/chat/Chat";
import { useApp } from "../context/app-context";
import { QUICK_PROMPTS } from "../data/content";

export function CompanionScreen() {
  const { messages, typing, sendMessage, go, showToast } = useApp();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <Screen className="overflow-hidden pb-2">
      <Header
        align="center"
        title="Serene"
        subtitle="Your AI Companion"
        right={
          <IconButton label="More" onClick={() => go("safety")}>
            <MoreHorizontal size={20} />
          </IconButton>
        }
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="scrollbar-none flex-1 space-y-3 overflow-y-auto pb-3">
          {messages.map((msg) =>
            msg.role === "ai" ? <AIMessage key={msg.id} text={msg.text} /> : <UserMessage key={msg.id} text={msg.text} />,
          )}
          {typing ? <TypingDots /> : null}
          <div ref={endRef} />
        </div>

        <div className="scrollbar-none -mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">
          {QUICK_PROMPTS.map((prompt) => (
            <QuickPrompt key={prompt} label={prompt} onSelect={() => sendMessage(prompt)} />
          ))}
        </div>

        <ChatInput
          onSend={sendMessage}
          onVoice={() => showToast("Voice is coming soon — you can type for now.")}
        />
        <p className="mt-2 text-center text-meta text-ink-muted">
          Serene is a wellness companion, not a doctor or therapist.
        </p>
      </div>
    </Screen>
  );
}
