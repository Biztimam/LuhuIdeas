import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useScrollProgress } from './Reveal';

const NAV = [
  { label: 'Mission', href: '#mission' },
  { label: 'Approach', href: '#approach' },
  { label: 'Initiatives', href: '#initiatives' },
  { label: 'Ideas', href: '#ideas' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-3">
          <Logo className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[8deg]" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight text-white">
              LUHU<span className="text-brand-400"> IDEAS</span>
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.28em] text-ink-400">
              Innovation Hub
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-4 py-2 text-sm text-ink-300 transition-colors hover:text-white"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 scale-90 rounded-full bg-white/0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:bg-white/5 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#submit"
            className="hidden items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-ink-950 shadow-[0_0_0_0_rgba(20,176,123,0.5)] transition-all duration-300 hover:bg-brand-400 hover:shadow-[0_0_24px_2px_rgba(20,176,123,0.45)] md:inline-flex"
          >
            Share an idea
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink-950/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base text-ink-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#submit"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-ink-950"
          >
            Share an idea <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-brand-400 via-brand-500 to-accent-400 transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  );
}