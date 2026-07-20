import { useEffect, useRef, useState } from 'react';
import { Reveal } from './Reveal';
import { STATS } from '../lib/content';

function useCountUp(target: string, active: boolean) {
  // Parse numeric portion for a simple count-up; non-numeric targets render as-is.
  const match = target.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : '';
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active || numeric === null) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = numeric * eased;
      const formatted =
        numeric % 1 === 0 ? Math.round(value).toString() : value.toFixed(1);
      setDisplay(`${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, numeric, suffix]);

  return display;
}

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal>
          <div
            ref={ref}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] lg:grid-cols-4"
          >
            {STATS.map((s) => (
              <StatCell key={s.label} value={s.value} label={s.label} active={active} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({
  value,
  label,
  active,
}: {
  value: string;
  label: string;
  active: boolean;
}) {
  const display = useCountUp(value, active);
  return (
    <div className="group relative bg-ink-950/40 p-7 text-center transition-colors duration-500 hover:bg-ink-950/20 sm:p-9">
      <div className="font-display text-4xl font-semibold tracking-tight brand-gradient-text sm:text-5xl">
        {display}
      </div>
      <div className="mt-2 text-xs uppercase tracking-[0.18em] text-ink-400">
        {label}
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-brand-400 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}