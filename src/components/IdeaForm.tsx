import { useState, type FormEvent } from 'react';
import { Check, Loader2, Send, AlertCircle } from 'lucide-react';
import { Reveal } from './Reveal';
import { CATEGORIES } from '../lib/content';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function IdeaForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    title: '',
    category: CATEGORIES[0].label,
    description: '',
  });

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
      };
      const { error: dbError } = await supabase
        .from('idea_submissions')
        .insert(payload);
      if (dbError) throw dbError;

      // Fire email notification — best-effort; a failure here should not
      // invalidate the successful DB save.
      try {
        const fnUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-idea`;
        await fetch(fnUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(payload),
        });
      } catch {
        // notification failed silently — idea is still saved in the DB
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        title: '',
        category: CATEGORIES[0].label,
        description: '',
      });
      // Tell the page a new idea was added so the feed can refresh.
      window.dispatchEvent(new CustomEvent('luhu:idea-added'));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setStatus('error');
      setError(msg);
    }
  };

  if (status === 'success') {
    return (
      <Reveal className="h-full">
        <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-brand-400/30 bg-gradient-to-b from-brand-500/10 to-transparent p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20 text-brand-300">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-white">
            Your idea just landed.
          </h3>
          <p className="mt-3 max-w-sm text-pretty text-ink-300">
            Thank you. Every submission helps us map the friction no one else is
            fixing — we read all of them.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Share another
          </button>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal className="h-full">
      <form
        onSubmit={handleSubmit}
        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 backdrop-blur sm:p-9"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-400">
            Share an idea
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
            What feels harder than it should?
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-300">
            Tell us the everyday friction point you keep running into. We will
            add it to the wall of ideas we are exploring.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <Field label="Your name" htmlFor="name">
              <input
                id="name"
                required
                value={form.name}
                onChange={update('name')}
                placeholder="Jordan Lee"
                className={inputCls}
              />
            </Field>
            <Field label="Email" htmlFor="email">
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update('email')}
                placeholder="you@example.com"
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Idea title" htmlFor="title" className="mt-4">
            <input
              id="title"
              required
              maxLength={80}
              value={form.title}
              onChange={update('title')}
              placeholder="Renewing my passport in one screen"
              className={inputCls}
            />
          </Field>

          <Field label="Where does the friction live?" htmlFor="category" className="mt-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CATEGORIES.map((c) => {
                const Icon = c.icon;
                const active = form.category === c.label;
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, category: c.label }))}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                      active
                        ? 'border-brand-400/60 bg-brand-500/15 text-white'
                        : 'border-white/10 bg-white/[0.02] text-ink-300 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${active ? 'text-brand-300' : 'text-ink-400'}`}
                    />
                    <span className="truncate">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Describe the friction" htmlFor="description" className="mt-4">
            <textarea
              id="description"
              required
              minLength={20}
              maxLength={600}
              rows={4}
              value={form.description}
              onChange={update('description')}
              placeholder="What happens today, and what would effortless look like instead?"
              className={`${inputCls} resize-none`}
            />
            <div className="mt-1.5 text-right text-[11px] text-ink-500">
              {form.description.length}/600
            </div>
          </Field>

          {status === 'error' && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error || 'Could not submit. Please try again.'}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending it in…
              </>
            ) : (
              <>
                Submit idea
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-ink-500">
            We only use your email to follow up on your idea. Nothing else.
          </p>
        </div>
      </form>
    </Reveal>
  );
}

const inputCls =
  'w-full rounded-xl border border-white/10 bg-ink-950/40 px-4 py-3 text-sm text-white placeholder:text-ink-500 outline-none transition-all duration-200 focus:border-brand-400/60 focus:bg-ink-950/60 focus:ring-2 focus:ring-brand-400/20';

function Field({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-400"
      >
        {label}
      </label>
      {children}
    </div>
  );
}