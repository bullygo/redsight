import { useState } from 'react';
import { type Report } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { X, MapPin, Calendar, User, Car, Share2, Facebook, Twitter, Link2, Check, AlertCircle } from 'lucide-react';

interface ReportDetailProps {
  report: Report;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ReportDetail({ report, onClose }: ReportDetailProps) {
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const shareUrl = `${window.location.origin}?report=${report.id}`;
  const shareText = `Animal abuse reported on Redsight: ${report.description.substring(0, 100)}... Help spread awareness. #Redsight #StopAnimalAbuse`;

  const incrementShare = async () => {
    try {
      await supabase
        .from('reports')
        .update({ share_count: report.share_count + 1 })
        .eq('id', report.id);
    } catch {
      // non-critical
    }
  };

  const handleTwitterShare = () => {
    setShareError(null);
    incrementShare();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleFacebookShare = () => {
    setShareError(null);
    incrementShare();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      incrementShare();
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setShareError('Could not copy link. Please copy manually.');
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="animate-slide-up rs-card my-8 w-full max-w-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-64 sm:h-80">
          <img src={report.image_url} alt="Report evidence" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-rs-surface via-transparent to-black/40" />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm hover:bg-rs-primary"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute left-4 top-4">
            {report.report_type === 'individual' ? (
              <span className="rs-badge bg-rs-primary/90 text-white backdrop-blur-sm">
                <User className="h-3 w-3" />
                Individual
              </span>
            ) : (
              <span className="rs-badge bg-rs-accent/90 text-white backdrop-blur-sm">
                <Car className="h-3 w-3" />
                Vehicle
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-rs-muted">
              <MapPin className="h-4 w-4 text-rs-primary" />
              <span>{report.location}</span>
            </div>
            <div className="flex items-center gap-2 text-rs-muted">
              <Calendar className="h-4 w-4 text-rs-primary" />
              <span>{formatDate(report.incident_date)}</span>
            </div>
            {report.license_plate && (
              <div className="flex items-center gap-2 text-rs-muted">
                <Car className="h-4 w-4 text-rs-accent" />
                <span className="rounded-md bg-rs-surface-2 px-2 py-0.5 font-mono font-bold text-rs-text">
                  {report.license_plate}
                </span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-rs-muted">
              Description
            </h3>
            <p className="mt-2 text-base leading-relaxed text-rs-text">
              {report.description}
            </p>
          </div>

          {/* Share section */}
          <div className="mt-8 border-t border-rs-border pt-6">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-rs-text">
              <Share2 className="h-4 w-4 text-rs-primary" />
              Spread the Word
            </h3>
            <p className="mt-1 text-sm text-rs-muted">
              Sharing this report increases visibility and puts pressure on abusers. Share now.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleTwitterShare}
                className="flex items-center gap-2 rounded-xl border border-rs-border bg-rs-surface-2 px-4 py-2.5 text-sm font-semibold text-rs-text transition-all hover:border-rs-primary hover:text-rs-primary-light"
              >
                <Twitter className="h-4 w-4" />
                Twitter / X
              </button>
              <button
                onClick={handleFacebookShare}
                className="flex items-center gap-2 rounded-xl border border-rs-border bg-rs-surface-2 px-4 py-2.5 text-sm font-semibold text-rs-text transition-all hover:border-rs-primary hover:text-rs-primary-light"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 rounded-xl border border-rs-border bg-rs-surface-2 px-4 py-2.5 text-sm font-semibold text-rs-text transition-all hover:border-rs-primary hover:text-rs-primary-light"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-rs-success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            {shareError && (
              <div className="mt-3 flex items-center gap-2 text-xs text-rs-error">
                <AlertCircle className="h-3.5 w-3.5" />
                {shareError}
              </div>
            )}

            <div className="mt-4 flex items-center gap-2 text-xs text-rs-muted">
              <Share2 className="h-3.5 w-3.5" />
              {report.share_count} {report.share_count === 1 ? 'person has' : 'people have'} shared this report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
