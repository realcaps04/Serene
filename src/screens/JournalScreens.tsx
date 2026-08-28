import { Plus, Search, Sparkles } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { PrimaryButton } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MoodSelector } from "../components/mood/MoodSelector";
import { JournalCard, JournalEditor } from "../components/wellness/Wellness";
import { useApp } from "../context/app-context";
import { MOODS } from "../data/content";

function formatWhen(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const same = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const label = same ? "Today" : d.toDateString() === yesterday.toDateString() ? "Yesterday" : d.toLocaleDateString();
  return `${label}, ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

export function JournalListScreen() {
  const { journalEntries, go } = useApp();

  return (
    <Screen className="relative overflow-hidden">
      <Header title="Your Journal" subtitle="Your safe space." />
      <div className="mb-4 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-input border border-line bg-white px-3 py-2.5 shadow-soft dark:bg-surface-card">
          <Search size={16} className="text-ink-muted" />
          <input
            placeholder="Search entries"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            aria-label="Search entries"
          />
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pb-20">
        {journalEntries.map((entry) => (
          <JournalCard
            key={entry.id}
            title={entry.title}
            when={formatWhen(entry.createdAt)}
            moodLabel={MOODS.find((m) => m.id === entry.mood)?.label ?? ""}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="New journal entry"
        onClick={() => go("journal-new")}
        className="pressable absolute bottom-6 right-5 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-lavender to-pink-premium text-white shadow-lift"
      >
        <Plus size={24} />
      </button>
    </Screen>
  );
}

export function JournalEditorScreen() {
  const { journalDraft, setJournalDraft, journalMood, setJournalMood, saveJournal, sendMessage, go, showToast } =
    useApp();

  return (
    <Screen>
      <Header
        align="center"
        title="Journal"
        subtitle="Your safe space."
        right={
          <button type="button" className="text-sm font-semibold text-indigo-brand" onClick={saveJournal}>
            Save
          </button>
        }
      />
      <Card className="p-4">
        <p className="mb-2 text-sm font-semibold text-ink">How are you feeling?</p>
        <MoodSelector value={journalMood} onChange={setJournalMood} compact />
      </Card>
      <p className="mb-2 mt-6 text-sm font-semibold text-ink">What's on your mind today?</p>
      <div className="relative">
        <JournalEditor value={journalDraft} onChange={setJournalDraft} />
        <svg className="pointer-events-none absolute bottom-3 right-3 h-16 w-16 text-lavender/30" viewBox="0 0 64 64" aria-hidden>
          <path d="M40 52c-8-14 4-16 2-28 8 4 12 12 18 8-6 14-8 18-20 20Z" fill="currentColor" />
        </svg>
      </div>
      <button
        type="button"
        onClick={() => {
          if (!journalDraft.trim()) {
            showToast("Write a little, then Serene can reflect with you.");
            return;
          }
          sendMessage(`I've been journaling: ${journalDraft.slice(0, 180)}`);
          go("companion");
        }}
        className="pressable mt-4 flex w-full items-center justify-between rounded-btn bg-lavender-surface px-4 py-3.5 text-sm font-semibold text-indigo-brand"
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles size={16} />
          Reflect with Serene
        </span>
        <span aria-hidden>›</span>
      </button>
      <PrimaryButton full className="mt-3" onClick={saveJournal}>
        Save privately
      </PrimaryButton>
      <p className="mt-3 text-center text-meta text-ink-muted">Your reflections stay yours.</p>
    </Screen>
  );
}
