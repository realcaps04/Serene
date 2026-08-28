import type { AiPersonality } from "./types";

function pick(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)];
}

export function replyTo(input: string, name: string, personality: AiPersonality) {
  const text = input.toLowerCase();

  if (/suicid|kill myself|end it|self[- ]?harm|want to die/.test(text)) {
    return `I'm really glad you told me, ${name}. I can't keep you safe the way a person in the real world can.\n\nIf you might be in danger, please contact emergency services or a crisis line now. You can also open Get Support in Serene.\n\nYou don't have to carry this alone.`;
  }

  if (/overwhelmed|too much|can't cope|cant cope/.test(text)) {
    return personality === "encouraging"
      ? `That sounds like a lot to hold, ${name}. You don't have to sort it all at once. What's the one thing that feels heaviest right now? We can sit with that, then choose a small next step.`
      : `That sounds like a lot to carry. Let's take this one step at a time.\n\nWhen you say overwhelmed, is it more like a pile of tasks, or a feeling that doesn't have a name yet?`;
  }

  if (/relax|calm|anxious|anxiety|panic/.test(text)) {
    return `We can slow the room down a little.\n\nIf it helps, try this with me: breathe in for four, hold for two, out for six. Would you like to start a short breathing practice, or keep talking first?`;
  }

  if (/overthink|overthinking|racing|spiral/.test(text)) {
    return `Racing thoughts are exhausting — they often try to keep you safe by scanning every angle.\n\nIf you're willing, name one thought that's looping. We don't have to solve it. We can just set it down on the page.`;
  }

  if (/motivat|stuck|lazy|give up/.test(text)) {
    return personality === "calm"
      ? `You don't have to feel inspired to take a kind next step. What's one thing that's 2 minutes or less — something your future self would quietly thank you for?`
      : `Motivation often follows a tiny action, not the other way around. What's one small thing you could do that would make today 5% kinder?`;
  }

  if (/meditat|mindful|breathe|breathing/.test(text)) {
    return `We can make a little space together. A 5-minute reset is enough — no perfect posture, no empty mind required.\n\nWould you like to start a breathing practice, or would you rather stay here and talk?`;
  }

  if (/sad|low|down|empty|numb/.test(text)) {
    return `Thank you for saying that plainly. There's no right way to feel today.\n\nI'm here to listen. If you want, tell me what the last few hours have been like — or we can just sit with it quietly.`;
  }

  if (/sleep|tired|insomnia/.test(text)) {
    return `Rest can feel far away when the mind is still working. If it helps, we can look at a gentler wind-down — or you can tell me what's keeping you up.`;
  }

  const warm = [
    `I'm here with you, ${name}. Say more if you'd like — even messy thoughts are welcome.`,
    `That matters. I'm listening. What would feel most useful right now: talking it through, a short pause, or writing it down?`,
    `Thank you for sharing that. We can go slowly. What part of this feels most present in your body right now?`,
  ];
  return pick(warm);
}
