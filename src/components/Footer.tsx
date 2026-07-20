import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-ink-950">
      <div className="mx-auto max-w-8xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="font-display text-xl font-semibold text-white">
                LUHU<span className="text-brand-400"> IDEAS</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-ink-400">
              An innovation hub transforming abstract concepts into practical,
              real-life solutions that simplify daily living.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-ink-300 transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterCol
              title="Explore"
              links={[
                { label: 'Mission', href: '#mission' },
                { label: 'Approach', href: '#approach' },
                { label: 'Initiatives', href: '#initiatives' },
                { label: 'Ideas wall', href: '#ideas' },
              ]}
            />
            <FooterCol
              title="Company"
              links={[
                { label: 'About', href: '#mission' },
                { label: 'Contact', href: '#submit' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
              ]}
            />
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-ink-500">
                Get in touch
              </h4>
              <a
                href="mailto:hello@luhuideas.com"
                className="mt-4 block text-sm text-ink-200 transition hover:text-white"
              >
                hello@luhuideas.com
              </a>
              <p className="mt-3 text-sm text-ink-400">
                Bridging the gap between idea and effortless — every day.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-7 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} LUHU IDEAS. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
            Designed for a smoother day.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.2em] text-ink-500">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-ink-300 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}