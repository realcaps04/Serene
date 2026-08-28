import { Bell, Clock, Moon, Sparkles, Volume2, Waves, Wind } from "lucide-react";
import { Screen } from "../components/navigation/AppShell";
import { Header } from "../components/navigation/Chrome";
import { IconButton } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Modal, SettingsRow } from "../components/ui/Overlay";
import { useApp } from "../context/app-context";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { AiPersonality, BreathingPace, SoundChoice } from "../lib/types";

export function SettingsScreen() {
  const { go, settings, updateSettings, showToast } = useApp();
  const [panel, setPanel] = useState<string | null>(null);

  return (
    <Screen className="overflow-y-auto">
      <Header
        align="center"
        title="Preferences"
        left={
          <IconButton label="Back" onClick={() => go("profile")}>
            <ArrowLeft size={20} />
          </IconButton>
        }
      />

      <p className="mb-2 text-sm font-semibold text-ink">AI Companion</p>
      <Card className="mb-5 divide-y divide-line overflow-hidden p-0">
        <SettingsRow
          icon={Sparkles}
          title="AI Personality"
          value={labelPersonality(settings.aiPersonality)}
          onClick={() => setPanel("personality")}
        />
        <SettingsRow
          icon={Bell}
          title="Chat Reminders"
          value={settings.chatReminders === "off" ? "Off" : settings.chatReminders === "daily" ? "Daily" : "Evening"}
          onClick={() => setPanel("reminders")}
        />
      </Card>

      <p className="mb-2 text-sm font-semibold text-ink">Mindfulness</p>
      <Card className="mb-5 divide-y divide-line overflow-hidden p-0">
        <SettingsRow
          icon={Clock}
          title="Meditation Duration"
          value={`${settings.meditationDuration} min`}
          onClick={() => setPanel("duration")}
        />
        <SettingsRow
          icon={Waves}
          title="Breathing Pace"
          value={settings.breathingPace === "normal" ? "Normal" : settings.breathingPace === "slow" ? "Slow" : "Gentle"}
          onClick={() => setPanel("pace")}
        />
      </Card>

      <p className="mb-2 text-sm font-semibold text-ink">General</p>
      <Card className="divide-y divide-line overflow-hidden p-0">
        <SettingsRow
          icon={Moon}
          title="Dark Mode"
          toggle={{ checked: settings.darkMode, onChange: (next) => updateSettings({ darkMode: next }) }}
        />
        <SettingsRow
          icon={Clock}
          title="Reminder Time"
          value={formatTime(settings.reminderTime)}
          onClick={() => setPanel("time")}
        />
        <SettingsRow
          icon={Volume2}
          title="Sound"
          value={labelSound(settings.sound)}
          onClick={() => setPanel("sound")}
        />
        <SettingsRow icon={Wind} title="Language" value={settings.language} onClick={() => showToast("English is available in this preview.")} />
      </Card>

      <Modal open={panel === "personality"} title="AI Personality" onClose={() => setPanel(null)}>
        <Choice
          options={[
            { id: "empathetic", label: "Empathetic" },
            { id: "calm", label: "Calm" },
            { id: "encouraging", label: "Encouraging" },
          ]}
          value={settings.aiPersonality}
          onChange={(id) => {
            updateSettings({ aiPersonality: id as AiPersonality });
            setPanel(null);
          }}
        />
      </Modal>
      <Modal open={panel === "reminders"} title="Chat Reminders" onClose={() => setPanel(null)}>
        <Choice
          options={[
            { id: "off", label: "Off" },
            { id: "daily", label: "Daily" },
            { id: "evening", label: "Evening" },
          ]}
          value={settings.chatReminders}
          onChange={(id) => {
            updateSettings({ chatReminders: id as typeof settings.chatReminders });
            setPanel(null);
          }}
        />
      </Modal>
      <Modal open={panel === "duration"} title="Meditation Duration" onClose={() => setPanel(null)}>
        <Choice
          options={[
            { id: "5", label: "5 min" },
            { id: "10", label: "10 min" },
            { id: "15", label: "15 min" },
          ]}
          value={String(settings.meditationDuration)}
          onChange={(id) => {
            updateSettings({ meditationDuration: Number(id) as 5 | 10 | 15 });
            setPanel(null);
          }}
        />
      </Modal>
      <Modal open={panel === "pace"} title="Breathing Pace" onClose={() => setPanel(null)}>
        <Choice
          options={[
            { id: "slow", label: "Slow" },
            { id: "normal", label: "Normal" },
            { id: "gentle", label: "Gentle" },
          ]}
          value={settings.breathingPace}
          onChange={(id) => {
            updateSettings({ breathingPace: id as BreathingPace });
            setPanel(null);
          }}
        />
      </Modal>
      <Modal open={panel === "time"} title="Reminder Time" onClose={() => setPanel(null)}>
        <input
          type="time"
          value={settings.reminderTime}
          onChange={(e) => updateSettings({ reminderTime: e.target.value })}
          className="mt-2 w-full rounded-input border border-line px-3 py-3 text-ink"
        />
      </Modal>
      <Modal open={panel === "sound"} title="Sound" onClose={() => setPanel(null)}>
        <Choice
          options={[
            { id: "chimes", label: "Chimes" },
            { id: "soft-piano", label: "Soft piano" },
            { id: "nature", label: "Nature" },
            { id: "off", label: "Off" },
          ]}
          value={settings.sound}
          onChange={(id) => {
            updateSettings({ sound: id as SoundChoice });
            setPanel(null);
          }}
        />
      </Modal>
    </Screen>
  );
}

function Choice({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={`w-full rounded-card px-4 py-3 text-left text-sm font-medium ${
            value === opt.id ? "bg-lavender-surface text-indigo-brand" : "bg-lavender-surface/40 text-ink"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function labelPersonality(p: AiPersonality) {
  return p === "empathetic" ? "Empathetic" : p === "calm" ? "Calm" : "Encouraging";
}

function labelSound(s: SoundChoice) {
  if (s === "soft-piano") return "Soft piano";
  if (s === "off") return "Off";
  if (s === "nature") return "Nature";
  return "Chimes";
}

function formatTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
