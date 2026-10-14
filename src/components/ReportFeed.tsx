import { type Report } from '@/lib/supabase';
import ReportCard from './ReportCard';
import { Loader2, ShieldAlert, Filter } from 'lucide-react';

interface ReportFeedProps {
  reports: Report[];
  loading: boolean;
  onReportClick: (report: Report) => void;
  filter: 'all' | 'individual' | 'vehicle';
  onFilterChange: (filter: 'all' | 'individual' | 'vehicle') => void;
}

export default function ReportFeed({ reports, loading, onReportClick, filter, onFilterChange }: ReportFeedProps) {
  return (
    <section id="feed" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-rs-primary-light">
              Community Reports
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold text-rs-text">
              Latest <span className="rs-gradient-text">Reports</span>
            </h2>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 rounded-xl border border-rs-border bg-rs-surface p-1">
            <Filter className="ml-2 h-4 w-4 text-rs-muted" />
            {(['all', 'individual', 'vehicle'] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? 'bg-rs-primary text-white'
                    : 'text-rs-muted hover:text-rs-text'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-rs-primary" />
            <p className="mt-4 text-sm text-rs-muted">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rs-surface-2">
              <ShieldAlert className="h-8 w-8 text-rs-muted" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold text-rs-text">No reports yet</h3>
            <p className="mt-2 max-w-sm text-sm text-rs-muted">
              Be the first to expose animal abuse in your community. Every report makes a difference.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} onClick={() => onReportClick(report)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
