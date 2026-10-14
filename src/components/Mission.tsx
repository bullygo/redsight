import { Target, Eye, Share2, ShieldCheck, Camera, Scale, Heart, Lock } from 'lucide-react';

export default function Mission() {
  const pillars = [
    {
      icon: Camera,
      title: 'Document',
      description: 'Capture photo evidence of animal abuse — individuals caught in the act or vehicle license plates of suspected abusers. Upload it in seconds, no account required.',
    },
    {
      icon: Eye,
      title: 'Expose',
      description: 'Every report is public and permanent. The community sees what happened, where, and when. Sunlight is the best disinfectant against cruelty.',
    },
    {
      icon: Share2,
      title: 'Amplify',
      description: 'Share any report to social media in one click. The more eyes on a report, the harder it is for abusers to hide and the faster pressure builds.',
    },
    {
      icon: Scale,
      title: 'Accountability',
      description: 'Reports build a public record that authorities, journalists, and communities can act on. Pattern offenders get flagged. Evidence accumulates. Justice follows.',
    },
  ];

  const values = [
    {
      icon: Lock,
      title: 'Anonymous by Design',
      description: 'No sign-up. No tracking. No personal data collected. Report safely without fear of retaliation from the very people you are exposing.',
    },
    {
      icon: ShieldCheck,
      title: 'Evidence First',
      description: 'Every report requires a photo. We do not deal in hearsay or rumors — only documented, verifiable proof of what you witnessed.',
    },
    {
      icon: Heart,
      title: 'Community Powered',
      description: 'Redsight is built by people who refuse to look away. Every upload, every share, every view is an act of solidarity with animals who cannot speak for themselves.',
    },
    {
      icon: Target,
      title: 'Zero Tolerance',
      description: 'We do not rank cruelty by severity or pick which victims matter. Every act of abuse deserves to be seen, named, and confronted — no exceptions.',
    },
  ];

  return (
    <section id="mission" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-rs-surface to-rs-bg" />
      <div className="absolute left-1/2 top-0 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-rs-primary/5 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mission statement */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-rs-primary-light">
            Our Mission
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold text-rs-text sm:text-5xl">
            Make Abuse <span className="rs-gradient-text">Visible</span>. Make Abusers <span className="rs-gradient-text">Accountable</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-rs-muted">
            Animals cannot file police reports. They cannot testify in court. They cannot call for help.
            Redsight exists to be their voice — a public, permanent record of cruelty that cannot be ignored,
            denied, or buried. We believe that visibility is the most powerful tool against abuse, and that
            a community which refuses to look away is a community that can force change.
          </p>
        </div>

        {/* How it works pillars */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-rs-primary-light">
            How It Works
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-rs-text sm:text-3xl">
            Four Steps to <span className="rs-gradient-text">Justice</span>
          </h3>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rs-card group p-6"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rs-primary/10 transition-colors group-hover:bg-rs-primary/20">
                  <Icon className="h-6 w-6 text-rs-primary-light" />
                </div>
                <h4 className="font-display text-lg font-bold text-rs-text">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-rs-muted">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Values */}
        <div className="mx-auto mt-20 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-rs-primary-light">
            What We Stand For
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-rs-text sm:text-3xl">
            Our <span className="rs-gradient-text">Principles</span>
          </h3>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rs-card group flex gap-4 p-6"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rs-primary/10 transition-colors group-hover:bg-rs-primary/20">
                  <Icon className="h-5 w-5 text-rs-primary-light" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-rs-text">
                    {value.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-rs-muted">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="rs-card border-rs-primary/20 p-8 text-center sm:p-12">
            <p className="font-display text-xl font-medium leading-relaxed text-rs-text sm:text-2xl">
              Silence enables suffering.
              <br />
              <span className="rs-gradient-text">Visibility ends it.</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-rs-muted">
              Every photo uploaded, every report shared, every person who sees the evidence
              is one more blow against cruelty hiding in the dark. That is the mission —
              and it starts with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
