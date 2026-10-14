import { useState, useEffect, useCallback } from 'react';
import { supabase, type Report } from '@/lib/supabase';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import ReportFeed from '@/components/ReportFeed';
import ReportForm from '@/components/ReportForm';
import ReportDetail from '@/components/ReportDetail';
import Footer from '@/components/Footer';

export default function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'individual' | 'vehicle'>('all');
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from('reports').select('*').order('created_at', { ascending: false });
      if (filter !== 'all') {
        query = query.eq('report_type', filter);
      }
      const { data, error } = await query;
      if (error) throw error;
      setReports(data || []);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const scrollToFeed = () => {
    document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormClose = () => setShowForm(false);
  const handleFormSubmitted = () => {
    fetchReports();
  };

  return (
    <div className="min-h-screen bg-rs-bg">
      <Header onReportClick={() => setShowForm(true)} />

      <main>
        <Hero
          onReportClick={() => setShowForm(true)}
          onScrollToFeed={scrollToFeed}
        />

        <ReportFeed
          reports={reports}
          loading={loading}
          onReportClick={setSelectedReport}
          filter={filter}
          onFilterChange={setFilter}
        />

        <Mission />
      </main>

      <Footer />

      {showForm && (
        <ReportForm onClose={handleFormClose} onSubmitted={handleFormSubmitted} />
      )}

      {selectedReport && (
        <ReportDetail
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}
    </div>
  );
}
