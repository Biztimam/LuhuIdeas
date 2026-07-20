import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { INITIATIVES } from '../lib/content';

export function Initiatives() {
  return (
    <section id="initiatives" className="relative py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-400">
              In the lab
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl">
              Initiatives making daily life smoother.
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-300">
              A few of the concepts we are actively exploring — each one starts
              with a real person hitting a real wall.
            </p>
          </div>
          <a
            href="#submit"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            Suggest a direction
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {INITIATIVES.map((n, i) => (
            <Reveal key={n.title} delay={i * 100}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/30">
                <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-brand-500/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-ink-200">
                    {n.tag}
                  </span>
                  <div className="text-right">
                    <div className="font-display text-3xl font-semibold brand-gradient-text">
                      {n.metric}
                    </div>
                    <div className="mt-1 text-xs text-ink-400">{n.metricLabel}</div>
                  </div>
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-white">
                  {n.title}
                </h3>
                <p className="relative mt-3 text-pretty leading-relaxed text-ink-300">
                  {n.blurb}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}