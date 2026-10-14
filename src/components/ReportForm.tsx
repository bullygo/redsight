import { useState, useRef } from 'react';
import { supabase, type ReportType, type ReportInsert } from '@/lib/supabase';
import { X, Upload, MapPin, Calendar, User, Car, Image as ImageIcon, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReportFormProps {
  onClose: () => void;
  onSubmitted: () => void;
}

export default function ReportForm({ onClose, onSubmitted }: ReportFormProps) {
  const [reportType, setReportType] = useState<ReportType>('individual');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be under 10MB.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!imageFile) {
      setError('Please upload an image as evidence.');
      return;
    }
    if (!description.trim()) {
      setError('Please describe what you witnessed.');
      return;
    }
    if (!location.trim()) {
      setError('Please provide the location of the incident.');
      return;
    }
    if (!incidentDate) {
      setError('Please provide the date and time of the incident.');
      return;
    }
    if (reportType === 'vehicle' && !licensePlate.trim()) {
      setError('Please provide the vehicle license plate.');
      return;
    }

    setSubmitting(true);

    try {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('report-images')
        .upload(fileName, imageFile);

      if (uploadError) throw new Error('Failed to upload image. Please try again.');

      const { data: urlData } = supabase.storage
        .from('report-images')
        .getPublicUrl(fileName);

      const insert: ReportInsert = {
        image_url: urlData.publicUrl,
        report_type: reportType,
        description: description.trim(),
        location: location.trim(),
        incident_date: new Date(incidentDate).toISOString(),
        license_plate: reportType === 'vehicle' ? licensePlate.trim().toUpperCase() : null,
      };

      const { error: insertError } = await supabase.from('reports').insert(insert);

      if (insertError) throw new Error('Failed to submit report. Please try again.');

      setSuccess(true);
      setTimeout(() => {
        onSubmitted();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="animate-scale-in rs-card mx-4 max-w-md p-8 text-center" onClick={(e) => e.stopPropagation()}>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rs-success/15">
            <CheckCircle2 className="h-8 w-8 text-rs-success" />
          </div>
          <h3 className="font-display text-2xl font-bold text-rs-text">Report Submitted</h3>
          <p className="mt-2 text-sm text-rs-muted">
            Thank you for standing up for animals. Your report is now visible to the public and ready to share.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="animate-slide-up rs-card my-8 w-full max-w-2xl p-6 sm:p-8 scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-rs-text">Report Animal Abuse</h2>
            <p className="mt-1 text-sm text-rs-muted">All fields are required. Your report will be public.</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-rs-border text-rs-muted hover:text-rs-text">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Report type toggle */}
          <div>
            <label className="rs-label">Report Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReportType('individual')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-all ${
                  reportType === 'individual'
                    ? 'border-rs-primary bg-rs-primary/10 text-rs-primary-light'
                    : 'border-rs-border bg-rs-surface-2 text-rs-muted hover:border-rs-muted'
                }`}
              >
                <User className="h-4 w-4" />
                Individual
              </button>
              <button
                type="button"
                onClick={() => setReportType('vehicle')}
                className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-sm font-semibold transition-all ${
                  reportType === 'vehicle'
                    ? 'border-rs-primary bg-rs-primary/10 text-rs-primary-light'
                    : 'border-rs-border bg-rs-surface-2 text-rs-muted hover:border-rs-muted'
                }`}
              >
                <Car className="h-4 w-4" />
                Vehicle
              </button>
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="rs-label">Evidence Photo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-rs-border">
                <img src={imagePreview} alt="Evidence preview" className="h-56 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-black/70 text-white backdrop-blur-sm hover:bg-rs-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-rs-border bg-rs-surface-2 p-8 text-rs-muted transition-colors hover:border-rs-primary hover:text-rs-primary-light"
              >
                <ImageIcon className="h-8 w-8" />
                <span className="text-sm font-medium">Click to upload evidence photo</span>
                <span className="text-xs text-rs-muted">PNG, JPG up to 10MB</span>
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="rs-label">What did you witness?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the abuse you witnessed in detail..."
              className="rs-input resize-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="rs-label">Location</label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rs-muted" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State or specific address"
                className="rs-input pl-10"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div>
            <label className="rs-label">Date & Time of Incident</label>
            <div className="relative">
              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rs-muted" />
              <input
                type="datetime-local"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="rs-input pl-10"
              />
            </div>
          </div>

          {/* License plate (conditional) */}
          {reportType === 'vehicle' && (
            <div className="animate-fade-in">
              <label className="rs-label">License Plate</label>
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="e.g. ABC-1234"
                className="rs-input uppercase"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-rs-error/30 bg-rs-error/10 p-3 text-sm text-rs-error">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="rs-btn-ghost flex-1">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="rs-btn-primary flex flex-[2] items-center justify-center gap-2 disabled:opacity-50">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Submit Report
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
