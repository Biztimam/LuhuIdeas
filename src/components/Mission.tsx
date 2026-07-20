import { Reveal } from './Reveal';

const PILLARS = [
  {
    title: 'Real-world utility first',
    body: 'If it does not make a daily task simpler, faster, or calmer, it does not ship. Utility is the bar — novelty is not.',
  },
  {
    title: 'Tech-driven, human-felt',
    body: 'We use modern technology to remove steps, not to add features. The best interface is the one you stop noticing.',
  },
  {
    title: 'Accessible by default',
    body: 'Convenience is only convenient if everyone can reach it. We design for the widest range of hands, eyes, and lives from day one.',
  },
  {
    title: 'Bridged, not bolted-on',
    body: 'We close the gap between an idea and its execution — turning "someone should build that" into something you can actually use.',
  },
];

export function Mission() {
  return (
    <section id="mission" className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-400">
                The mission
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl">
                Make modern life feel{' '}
                <span className="brand-gradient-text">effortless</span>.
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-300">
                Every day is full of small tasks that add up to a lot of mental
                overhead. LUHU IDEAS exists to take that weight off — by
                identifying the friction points no one has bothered to fix and
                bridging them with solutions that feel obvious in hindsight.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
                  <span className="font-display text-xl font-semibold">∞</span>
                </div>
                <p className="text-sm leading-relaxed text-ink-200">
                  <span className="font-semibold text-white">Our promise:</span>{' '}
                  if a task feels harder than it should, it is a candidate for a
                  LUHU idea.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="group h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_24px_60px_-24px_rgba(20,176,123,0.4)]">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-semibold text-brand-400">
                        0{i + 1}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-brand-400/40 to-transparent" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-300">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}