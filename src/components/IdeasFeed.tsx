import { useCallback, useEffect, useState } from 'react';
import { Loader2, MessageSquareQuote, RefreshCw } from 'lucide-react';
import { Reveal } from './Reveal';
import { IdeaForm } from './IdeaForm';
import { supabase, type IdeaSubmission } from '../lib/supabase';

const STATUS_STYLE: Record<string, { label: string; cls: string }> = {
  submitted: { label: 'Submitted', cls: 'text-ink-300 bg-white/5 border-white/10' },
  'under review': {
    label: 'Under review',
    cls: 'text-accent-300 bg-accent-500/10 border-accent-500/30',
  },
  'in exploration': {
    label: 'In exploration',
    cls: 'text-brand-300 bg-brand-500/10 border-brand-400/30',
  },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function IdeasFeed() {
  const [ideas, setIdeas] = useState<IdeaSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: dbError } = await supabase
      .from('idea_submissions')
      .select('id, name, title, category, description, status, created_at')
      .order('created_at', { ascending: false })
      .limit(12);
    if (dbError) {
      setError(dbError.message);
      setIdeas([]);
    } else {
      setIdeas((data as IdeaSubmission[]) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const onAdded = () => load();
    window.addEventListener('luhu:idea-added', onAdded);
    return () => window.removeEventListener('luhu:idea-added', onAdded);
  }, [load]);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/8 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
            <MessageSquareQuote className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              The idea wall
            </h3>
            <p className="text-xs text-ink-400">
              {loading
                ? 'Loading…'
                : `${ideas.length} ${ideas.length === 1 ? 'idea' : 'ideas'} shared`}
            </p>
          </div>
        </div>
        <button
          onClick={load}
          aria-label="Refresh feed"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition hover:rotate-180 hover:text-white"
          style={{ transitionDuration: '500ms' }}
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="custom-scroll max-h-[640px] flex-1 space-y-3 overflow-y-auto p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-ink-400">
            <Loader2 className="h-6 w-6 animate-spin text-brand-400" />
            <p className="mt-3 text-sm">Loading ideas…</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            Could not load ideas right now. {error}
          </div>
        ) : ideas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-ink-400">
              <MessageSquareQuote className="h-6 w-6" />
            </div>
            <p className="mt-4 text-sm text-ink-300">No ideas shared yet.</p>
            <p className="mt-1 text-xs text-ink-500">
              Be the first — submit one and watch it appear here.
            </p>
          </div>
        ) : (
          ideas.map((idea) => {
            const status = STATUS_STYLE[idea.status] ?? STATUS_STYLE.submitted;
            return (
              <article
                key={idea.id}
                className="group rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-all duration-300 hover:border-brand-400/30 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ink-200">
                    {idea.category}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${status.cls}`}
                  >
                    {status.label}
                  </span>
                </div>
                <h4 className="mt-3 font-display text-base font-semibold text-white">
                  {idea.title}
                </h4>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-300">
                  {idea.description}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[11px] text-ink-500">
                  <span className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-brand-400 to-accent-400" />
                  <span className="font-medium text-ink-300">{idea.name}</span>
                  <span>·</span>
                  <span>{timeAgo(idea.created_at)}</span>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}

export function IdeasSection() {
  return (
    <section id="ideas" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/8 blur-[160px]" />

      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-400">
            Open ideas
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl">
            The friction we&apos;re collecting.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-300">
            Drop your idea in, and watch it join a living wall of everyday
            problems worth solving. Every submission shapes what we explore next.
          </p>
        </Reveal>

        <div id="submit" className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="lg:sticky lg:top-28">
            <IdeaForm />
          </div>
          <IdeasFeed />
        </div>
      </div>
    </section>
  );
}