import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export default function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    setResult(null);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleInputChange = useCallback((e) => { handleFile(e.target.files[0]); }, [handleFile]);

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`${API_URL}/predict`, { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Prediction failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const confidencePercent = result
    ? Math.round(parseFloat(result.confidence) * 100)
    : 0;

  const isCAT = result?.prediction?.toLowerCase() === 'cat';

  return (
    <section
      id="predict"
      style={{
        backgroundColor: 'var(--color-soft-cloud)',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div
          className="hairline-bottom"
          style={{ paddingBottom: '24px', marginBottom: '40px' }}
        >
          <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '6px' }}>
            PetVision AI · Live Classifier
          </p>
          <h2 className="heading-xl" style={{ color: 'var(--color-ink)' }}>
            Classify Your Image
          </h2>
        </div>

        {/* Two-column layout at desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* ── Left: upload / preview area ── */}
          <div
            className="lg:border-r"
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-hairline)',
              padding: 'clamp(20px, 4vw, 40px)',
            }}
          >
            {!preview ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="relative flex flex-col items-center justify-center cursor-pointer"
                style={{
                  border: `2px dashed ${isDragging ? 'var(--color-ink)' : 'var(--color-hairline)'}`,
                  backgroundColor: isDragging ? 'var(--color-soft-cloud)' : 'var(--color-canvas)',
                  minHeight: '340px',
                  padding: '48px 32px',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-label="Upload image file"
                />

                {/* Upload icon in circular ink button */}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isDragging ? 'var(--color-ink)' : 'var(--color-soft-cloud)',
                    marginBottom: '24px',
                    transition: 'background-color 0.15s ease',
                  }}
                >
                  <Upload
                    size={24}
                    style={{ color: isDragging ? 'var(--color-canvas)' : 'var(--color-ink)' }}
                  />
                </div>

                <p className="body-strong" style={{ color: 'var(--color-ink)', textAlign: 'center' }}>
                  {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
                </p>
                <p className="caption-md" style={{ color: 'var(--color-mute)', marginTop: '6px', textAlign: 'center' }}>
                  or click to browse · PNG, JPG, WEBP
                </p>
              </div>
            ) : (
              <div>
                {/* Image preview — full-bleed on soft-cloud */}
                <div
                  className="relative"
                  style={{
                    backgroundColor: 'var(--color-soft-cloud)',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={preview}
                    alt="Uploaded preview"
                    className="w-full h-full object-contain"
                  />
                  {/* Remove button */}
                  <button
                    onClick={reset}
                    className="btn-icon-circular absolute top-3 right-3"
                    aria-label="Remove image"
                    style={{ backgroundColor: 'rgba(17,17,17,0.6)', color: 'var(--color-canvas)' }}
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Predict CTA */}
                <div style={{ marginTop: '24px' }}>
                  <button
                    onClick={handlePredict}
                    disabled={loading}
                    className="btn-primary w-full justify-center"
                    style={{ opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing…
                      </>
                    ) : (
                      'Predict'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: result / instructions ── */}
          <div
            className="lg:border-t-0 border-t"
            style={{
              backgroundColor: 'var(--color-canvas)',
              borderColor: 'var(--color-hairline)',
              padding: 'clamp(20px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <AnimatePresence mode="wait">
              {/* Loading state */}
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-6"
                  style={{ minHeight: '340px' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      border: '2px solid var(--color-hairline)',
                      borderTopColor: 'var(--color-ink)',
                    }}
                  />
                  <p className="caption-md" style={{ color: 'var(--color-mute)' }}>
                    AI is analyzing your image…
                  </p>
                </motion.div>
              )}

              {/* Result */}
              {!loading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ minHeight: '340px' }}
                >
                  {/* Prediction label */}
                  <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '6px' }}>
                    Prediction
                  </p>

                  <div
                    className="display-campaign"
                    style={{ color: 'var(--color-ink)', fontSize: 'clamp(48px, 6vw, 80px)', marginBottom: '8px' }}
                  >
                    {isCAT ? 'Cat' : 'Dog'}
                  </div>

                  <p className="body-md" style={{ color: 'var(--color-mute)', marginBottom: '32px' }}>
                    {isCAT ? "It's a cat." : "It's a dog."}
                  </p>

                  {/* Confidence row */}
                  <div style={{ marginBottom: '32px' }}>
                    <div
                      className="flex items-center justify-between"
                      style={{ marginBottom: '8px' }}
                    >
                      <span className="caption-md" style={{ color: 'var(--color-ink)' }}>
                        Confidence
                      </span>
                      <span className="body-strong" style={{ color: 'var(--color-ink)' }}>
                        {confidencePercent}%
                      </span>
                    </div>
                    <div className="confidence-bar-bg">
                      <motion.div
                        className="confidence-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${confidencePercent}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hairline-top" style={{ paddingTop: '24px' }}>
                    <button
                      onClick={reset}
                      className="btn-secondary"
                      style={{ height: '40px', padding: '0 20px', fontSize: '14px' }}
                    >
                      Try Another Image
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {!loading && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ minHeight: '340px' }}
                >
                  <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '8px' }}>
                    Error
                  </p>
                  <p className="body-strong" style={{ color: 'var(--color-sale)' }}>
                    {error}
                  </p>
                  <button
                    onClick={reset}
                    className="btn-secondary"
                    style={{ marginTop: '24px', height: '40px', padding: '0 20px', fontSize: '14px' }}
                  >
                    Try Again
                  </button>
                </motion.div>
              )}

              {/* Default empty state */}
              {!loading && !result && !error && (
                <motion.div
                  key="empty"
                  className="flex flex-col justify-center"
                  style={{ minHeight: '340px' }}
                >
                  <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '16px' }}>
                    How it works
                  </p>
                  {[
                    { num: '01', text: 'Upload a cat or dog photo using the panel on the left.' },
                    { num: '02', text: 'PetVision AI preprocesses the image — RGB conversion, 256×256 resize, pixel normalization — then runs it through the CNN.' },
                    { num: '03', text: 'Get the classification and confidence score. End-to-end response in under 200ms.' },
                  ].map((step) => (
                    <div
                      key={step.num}
                      className="flex items-start gap-5 hairline-bottom"
                      style={{ padding: '18px 0' }}
                    >
                      <span
                        className="body-strong"
                        style={{ color: 'var(--color-hairline)', flexShrink: 0, width: '28px' }}
                      >
                        {step.num}
                      </span>
                      <p className="body-md" style={{ color: 'var(--color-charcoal)' }}>
                        {step.text}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
