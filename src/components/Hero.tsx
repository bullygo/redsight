import { ShieldAlert, Eye, Share2, ArrowDown } from 'lucide-react';

interface HeroProps {
  onReportClick: () => void;
  onScrollToFeed: () => void;
}

export default function Hero({ onReportClick, onScrollToFeed }: HeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-rs-bg via-rs-bg to-rs-surface" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-rs-primary/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-rs-accent/10 blur-[120px]" />
      </div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #2d2a26 1px, transparent 1px), linear-gradient(to bottom, #2d2a26 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-32">
        <div className="animate-slide-up mb-6 inline-flex items-center gap-2 rounded-full border border-rs-primary/30 bg-rs-primary/10 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rs-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rs-primary" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-rs-primary-light">
            Animal Cruelty Is a Crime
          </span>
        </div>

        <h1 className="animate-slide-up font-display text-5xl font-bold leading-[1.05] text-rs-text sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.1s', opacity: 0 }}>
          Expose Animal Abuse.
          <br />
          <span className="rs-gradient-text">Protect the Voiceless.</span>
        </h1>

        <p className="animate-slide-up mt-6 max-w-2xl text-lg leading-relaxed text-rs-muted" style={{ animationDelay: '0.2s', opacity: 0 }}>
          Redsight is a community-driven platform to report and expose animal abusers.
          Upload evidence of caught-in-the-act cruelty or suspicious vehicles.
          Share it far and wide. Silence enables suffering — visibility ends it.
        </p>

        <div className="animate-slide-up mt-10 flex flex-col items-center gap-4 sm:flex-row" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <button onClick={onReportClick} className="rs-btn-primary flex items-center gap-2 text-base">
            <ShieldAlert className="h-5 w-5" />
            Report an Incident
          </button>
          <button onClick={onScrollToFeed} className="rs-btn-ghost flex items-center gap-2 text-base">
            <Eye className="h-5 w-5" />
            View Reports
          </button>
        </div>

        {/* Stats */}
        <div className="animate-slide-up mt-16 grid grid-cols-3 gap-4 sm:gap-12" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-rs-text sm:text-4xl">
              100%
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-rs-muted">
              Anonymous
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-rs-text sm:text-4xl">
              <span className="text-rs-primary">Zero</span>
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-rs-muted">
              Tolerance
            </div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl font-bold text-rs-text sm:text-4xl">
              <Share2 className="inline h-7 w-7 text-rs-accent" />
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-rs-muted">
              Spread It
            </div>
          </div>
        </div>

        <button
          onClick={onScrollToFeed}
          className="animate-fade-in mt-16 flex flex-col items-center gap-1 text-rs-muted transition-colors hover:text-rs-text"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
