import { ShieldAlert, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onReportClick: () => void;
}

export default function Header({ onReportClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToFeed = () => {
    document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToMission = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-rs-border bg-rs-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rs-primary to-rs-primary-dark shadow-lg shadow-rs-primary/20">
              <ShieldAlert className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold tracking-wide text-rs-text">
                RED<span className="text-rs-primary">SIGHT</span>
              </span>
              <span className="text-[0.6rem] font-medium uppercase tracking-widest text-rs-muted">
                Expose. Protect.
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <button onClick={scrollToFeed} className="text-sm font-medium text-rs-muted transition-colors hover:text-rs-text">
              Reports
            </button>
            <button onClick={scrollToMission} className="text-sm font-medium text-rs-muted transition-colors hover:text-rs-text">
              Our Mission
            </button>
            <button onClick={onReportClick} className="rs-btn-primary text-sm">
              Report Abuse
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-rs-border text-rs-text md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="animate-fade-in border-t border-rs-border py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              <button onClick={scrollToFeed} className="text-left text-sm font-medium text-rs-muted hover:text-rs-text">
                Reports
              </button>
              <button onClick={scrollToMission} className="text-left text-sm font-medium text-rs-muted hover:text-rs-text">
                Our Mission
              </button>
              <button onClick={() => { onReportClick(); setMenuOpen(false); }} className="rs-btn-primary text-sm text-center">
                Report Abuse
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
