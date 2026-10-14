import { type Report } from '@/lib/supabase';
import { MapPin, Calendar, User, Car, Share2, Eye } from 'lucide-react';

interface ReportCardProps {
  report: Report;
  onClick: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function ReportCard({ report, onClick }: ReportCardProps) {
  return (
    <div onClick={onClick} className="rs-card group cursor-pointer overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={report.image_url}
          alt="Report evidence"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
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
        {report.license_plate && (
          <div className="absolute bottom-3 left-3">
            <span className="rounded-md bg-black/70 px-2.5 py-1 font-mono text-sm font-bold text-white backdrop-blur-sm">
              {report.license_plate}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-rs-text">
          {report.description}
        </p>
        <div className="mt-3 flex flex-col gap-1.5 text-xs text-rs-muted">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-rs-primary" />
            <span className="truncate">{report.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-rs-primary" />
            <span>{formatDate(report.incident_date)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-rs-border pt-3">
          <div className="flex items-center gap-3 text-xs text-rs-muted">
            <span className="flex items-center gap-1">
              <Share2 className="h-3.5 w-3.5" />
              {report.share_count} shares
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              View
            </span>
          </div>
          <span className="text-xs font-medium text-rs-primary-light opacity-0 transition-opacity group-hover:opacity-100">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
}
