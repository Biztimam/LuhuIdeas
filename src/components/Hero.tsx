import { ArrowRight, Sparkles } from 'lucide-react';
import { FRICTION_QUOTES } from '../lib/content';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 lg:pt-40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[140px]" />
        <div className="absolute right-[8%] top-1/3 h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-ink-200 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
            </span>
            An innovation hub for everyday life
          </div>

          <h1 className="mt-7 max-w-5xl font-display text-5xl font-semibold leading-[1.02] tracking-tightest text-balance text-white sm:text-6xl lg:text-[5.25rem]">
            We turn friction into{' '}
            <span className="brand-gradient-text">effortless</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-300 sm:text-xl">
            LUHU IDEAS is a forward-thinking innovation hub dedicated to
            transforming abstract concepts into practical, real-life solutions
            that simplify daily living — putting ultimate convenience directly
            at people&apos;s fingertips.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#submit"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink-950 transition-all duration-300 hover:bg-ink-100 hover:shadow-[0_8px_40px_-8px_rgba(255,255,255,0.4)]"
            >
              Share a friction point
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#approach"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              See how we work
              <Sparkles className="h-4 w-4 text-brand-400 transition-transform duration-300 group-hover:rotate-12" />
            </a>
          </div>
        </div>

        {/* Friction marquee */}
        <div className="relative mt-16 overflow-hidden mask-fade-x">
          <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-ink-500">
            Things people tell us every day
          </p>
          <div className="flex w-max animate-marquee gap-4">
            {[...FRICTION_QUOTES, ...FRICTION_QUOTES].map((q, i) => (
              <div
                key={i}
                className="flex max-w-md items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3.5 backdrop-blur"
              >
                <span className="text-brand-400">“</span>
                <span className="text-sm text-ink-200">{q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero panel */}
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <HeroStat
            kicker="Our lens"
            title="Everyday friction points"
            body="We look at the small, daily frustrations people have stopped noticing — and treat them as the most important problems in the room."
            className="lg:col-span-2"
          />
          <HeroStat
            kicker="Our method"
            title="Accessible, seamless execution"
            body="Tech-driven efficiency meets real-world utility. We build the bridge between idea and impact, not just the idea."
            accent
          />
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  kicker,
  title,
  body,
  className = '',
  accent = false,
}: {
  kicker: string;
  title: string;
  body: string;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 text-left backdrop-blur transition-all duration-500 hover:border-white/20 ${className}`}
    >
      <div
        className={`absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
          accent ? 'bg-accent-500/20 opacity-60' : 'bg-brand-500/15 opacity-40'
        }`}
      />
      <p className="text-xs uppercase tracking-[0.28em] text-ink-400">{kicker}</p>
      <h3 className="mt-3 font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-pretty leading-relaxed text-ink-300">{body}</p>
    </div>
  );
}