import { Mic, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { CloudMascotAvatar } from "../brand/CloudMascot";

export function AIMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="flex items-end gap-2"
    >
      <CloudMascotAvatar size={38} />
      <div className="max-w-[82%] rounded-card bg-white px-4 py-3 text-body text-ink shadow-soft dark:bg-surface-card">
        {text.split("\n").map((line, i) => (
          <p key={i} className={i ? "mt-2" : ""}>
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export function UserMessage({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[82%] rounded-card bg-gradient-to-br from-indigo-brand to-lavender px-4 py-3 text-body text-white shadow-soft">
        {text}
      </div>
    </motion.div>
  );
}

export function TypingDots() {
  return (
    <div className="flex items-end gap-2" aria-label="Serene is thinking">
      <CloudMascotAvatar size={38} />
      <div className="flex gap-1 rounded-card bg-white px-4 py-3 shadow-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-lavender animate-pulse-dot" />
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-brand animate-pulse-dot [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-pink-premium animate-pulse-dot [animation-delay:300ms]" />
      </div>
    </div>
  );
}

export function QuickPrompt({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="pressable shrink-0 rounded-full border border-line bg-white px-3.5 py-2 text-meta font-medium text-ink shadow-soft dark:bg-surface-card"
    >
      {label}
    </button>
  );
}

export function ChatInput({
  onSend,
  onVoice,
}: {
  onSend: (text: string) => void;
  onVoice?: () => void;
}) {
  const [value, setValue] = useState("");

  const submit = () => {
    onSend(value);
    setValue("");
  };

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label className="sr-only" htmlFor="chat-input">
        Type your message
      </label>
      <div className="flex min-w-0 flex-1 items-center rounded-full border border-line bg-white px-4 py-2 shadow-soft dark:bg-surface-card">
        <input
          id="chat-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message..."
          className="min-w-0 flex-1 bg-transparent py-2 text-body text-ink outline-none placeholder:text-ink-muted"
        />
        <button
          type="button"
          aria-label="Voice message"
          onClick={onVoice}
          className="grid h-9 w-9 place-items-center rounded-full text-ink-secondary hover:bg-lavender-surface"
        >
          <Mic size={18} strokeWidth={1.75} />
        </button>
      </div>
      <button
        type="submit"
        aria-label="Send message"
        className="pressable grid h-11 w-11 place-items-center rounded-full bg-indigo-brand text-white shadow-soft"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
