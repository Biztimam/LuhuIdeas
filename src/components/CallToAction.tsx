import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

export function CallToAction() {
  return (
    <section className="relative py-28 lg:py-36">
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand-900/40 via-ink-900 to-ink-950 p-10 sm:p-16 lg:p-20">
            {/* Animated aurora */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-brand-500/25 blur-[120px]" />
              <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent-500/15 blur-[140px]" />
              <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-300">
                The point of it all
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                Convenience, at your{' '}
                <span className="brand-gradient-text">fingertips</span>.
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-200">
                If you have ever thought &ldquo;someone should fix that&rdquo; —
                you are exactly who we are listening to. Share the friction. We
                will handle the bridge from idea to effortless.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-ink-950 transition-all duration-300 hover:shadow-[0_12px_50px_-12px_rgba(255,255,255,0.5)]"
                >
                  Share your idea
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#mission"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Revisit the mission
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}