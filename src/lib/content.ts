import {
  Home,
  Briefcase,
  Plane,
  HeartPulse,
  Wallet,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export const CATEGORIES: { label: string; icon: LucideIcon }[] = [
  { label: 'Home & Living', icon: Home },
  { label: 'Work & Focus', icon: Briefcase },
  { label: 'Travel & Transit', icon: Plane },
  { label: 'Health & Wellness', icon: HeartPulse },
  { label: 'Money & Admin', icon: Wallet },
  { label: 'Something else', icon: Sparkles },
];

export const INITIATIVES = [
  {
    tag: 'Home & Living',
    title: 'Quiet mornings, automated',
    blurb:
      'Routines that choreograph lighting, climate, and reminders so the first hour of the day runs itself — no app-hopping, no guesswork.',
    metric: '–42 min',
    metricLabel: 'avg. morning friction',
  },
  {
    tag: 'Work & Focus',
    title: 'Context that follows you',
    blurb:
      'A workspace that remembers what you were doing, surfaces the three things that matter today, and silences the rest until you ask.',
    metric: '3.1×',
    metricLabel: 'deep-work sessions',
  },
  {
    tag: 'Travel & Transit',
    title: 'One-tap trip coherence',
    blurb:
      'Tickets, gates, delays, and ground transport collapsed into a single living timeline that updates itself the moment something shifts.',
    metric: '–68%',
    metricLabel: 'travel-related stress',
  },
  {
    tag: 'Health & Wellness',
    title: 'Care without the clipboard',
    blurb:
      'Records, refills, and reminders unified into one calm dashboard — so staying well feels less like administration and more like living.',
    metric: '+31%',
    metricLabel: 'adherence to care plans',
  },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Find the friction',
    body: 'We watch how people actually move through a day and map the quiet frustrations they have stopped noticing — the ones worth solving.',
  },
  {
    step: '02',
    title: 'Reframe as a question',
    body: 'Every idea becomes a sharp, testable question: "What would make this take one decision instead of five?" Clarity before code.',
  },
  {
    step: '03',
    title: 'Prototype in the real world',
    body: 'We build thin, working versions and put them into real hands fast — because convenience can only be judged by the people who feel it.',
  },
  {
    step: '04',
    title: 'Ship the seamless version',
    body: 'What survives becomes a product: refined, reliable, and designed to disappear into the background of a smoother day.',
  },
];

export const STATS = [
  { value: '120+', label: 'Friction points mapped' },
  { value: '38', label: 'Concepts in exploration' },
  { value: '14', label: 'Solutions shipped' },
  { value: '4.9/5', label: 'Average user delight' },
];

export const FRICTION_QUOTES = [
  'I just want to find my gate without three apps.',
  'Renewing my passport should take one screen, not six.',
  'Why does feeding a toddler feel like project management?',
  'Splitting rent shouldn\'t need a spreadsheet.',
  'I forget half of what my doctor said by the time I\'m home.',
  'Booking a dentist is harder than booking a flight.',
  'My subscriptions know me better than my bank does.',
  'Mornings should start with coffee, not configuration.',
];