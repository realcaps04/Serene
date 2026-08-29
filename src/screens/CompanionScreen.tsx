import { ChevronLeft, Menu } from "lucide-react";
import { useRef, useEffect } from "react";
import { Screen } from "../components/navigation/AppShell";
import {
  AIMessage,
  ChatInput,
  ChatTimestamp,
  TypingDots,
  UserMessage,
  WorryStarterStrip,
} from "../components/chat/Chat";
import { useApp } from "../context/app-context";
import { WORRY_STARTERS } from "../data/content";

function resolveTypingAccent(messages: { role: string; text: string }[]) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return "#60A5FA";
  return WORRY_STARTERS.find((s) => s.prompt === lastUser.text)?.color ?? "#60A5FA";
}

export function CompanionScreen() {
  const { messages, typing, sendMessage, go, showToast, name, googleUser } = useApp();
  const endRef = useRef<HTMLDivElement>(null);
  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <Screen className="overflow-hidden !px-4 !pb-[max(16px,env(safe-area-inset-bottom))]">
      <header className="mb-4 grid grid-cols-[44px_1fr_44px] items-center">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => go("home")}
          className="pressable grid h-11 w-11 place-items-center rounded-2xl bg-[#E8E8ED] text-ink-secondary"
        >
          <ChevronLeft size={22} strokeWidth={1.85} />
        </button>
        <div className="text-center">
          <h1 className="font-display text-[20px] font-semibold tracking-tight text-ink">Worry Tree</h1>
          <p className="mt-0.5 text-[12px] text-ink-muted">Understand. Release. Grow.</p>
        </div>
        <button
          type="button"
          aria-label="Menu"
          onClick={() => go("settings")}
          className="pressable grid h-11 w-11 place-items-center rounded-2xl bg-[#E8E8ED] text-ink-secondary"
        >
          <Menu size={20} strokeWidth={1.85} />
        </button>
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="scrollbar-none flex-1 space-y-4 overflow-y-auto pb-2">
          {messages.map((msg) =>
            msg.role === "ai" ? (
              <AIMessage
                key={msg.id}
                text={msg.text}
                accentColor={msg.accentColor}
                onSpeak={() => showToast("Listen is coming soon — read along for now.")}
              />
            ) : (
              <UserMessage
                key={msg.id}
                text={msg.text}
                time={msg.createdAt}
                name={name}
                picture={googleUser?.picture}
              />
            ),
          )}
          {typing ? <TypingDots accentColor={resolveTypingAccent(messages)} /> : null}
          {!typing && lastMessage ? <ChatTimestamp time={lastMessage.createdAt} /> : null}
          <div ref={endRef} />
        </div>

        <div className="shrink-0 pt-2">
          <p className="mb-3 text-[13px] font-semibold text-ink">Try one of these to get started</p>
          <WorryStarterStrip starters={WORRY_STARTERS} onSelect={(s) => sendMessage(s.prompt, s.color)} />

          <ChatInput
            onSend={sendMessage}
            onVoice={() => showToast("Voice is coming soon — you can type for now.")}
            onAttach={() => showToast("Attachments are coming soon.")}
          />
        </div>
      </div>
    </Screen>
  );
}
