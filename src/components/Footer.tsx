import { ShieldAlert, Heart, Eye } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-rs-border bg-rs-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rs-primary to-rs-primary-dark">
                <ShieldAlert className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-rs-text">
                RED<span className="text-rs-primary">SIGHT</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-rs-muted">
              A community-driven platform to expose animal abuse and protect the voiceless.
              Every report matters. Every share saves lives.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-rs-text">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <button onClick={() => document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-rs-muted transition-colors hover:text-rs-text">
                  View Reports
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm text-rs-muted transition-colors hover:text-rs-text">
                  Our Mission
                </button>
              </li>
              <li>
                <a href="tel:911" className="text-sm text-rs-muted transition-colors hover:text-rs-text">
                  Emergency: Call 911
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-rs-text">
              Important
            </h4>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-rs-muted">
              <Eye className="mt-0.5 h-4 w-4 shrink-0 text-rs-primary" />
              Redsight is a visibility tool, not a law enforcement agency.
              Always report active abuse to local authorities immediately.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-rs-border pt-6 sm:flex-row">
          <p className="text-xs text-rs-muted">
            &copy; {new Date().getFullYear()} Redsight. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-rs-muted">
            Built with <Heart className="h-3 w-3 fill-rs-primary text-rs-primary" /> for animals everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
