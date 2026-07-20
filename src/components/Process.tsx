import { Reveal } from './Reveal';
import { PROCESS } from '../lib/content';

export function Process() {
  return (
    <section id="approach" className="relative py-28 lg:py-36">
      {/* Section divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-400">
            The approach
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl">
            From abstract concept to real-life solution.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-300">
            We follow the same four beats for every idea — a deliberately slow
            path that keeps us honest about whether something is actually
            convenient, or just clever.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 100}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
                <span className="pointer-events-none absolute -right-4 -top-8 font-display text-[7rem] font-semibold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-brand-400/10">
                  {p.step}
                </span>
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-400/30 bg-brand-500/10 font-display text-sm font-semibold text-brand-300">
                    {p.step}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-300">
                    {p.body}
                  </p>
                </div>
                {i < PROCESS.length - 1 && (
                  <span className="absolute right-7 top-9 hidden h-px w-12 bg-gradient-to-r from-white/20 to-transparent lg:block" />
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}