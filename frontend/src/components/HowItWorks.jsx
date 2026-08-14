import { motion } from 'framer-motion';
import { Upload, ScanLine, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'Upload Image',
    description:
      'Drag & drop or select any cat or dog photo. PNG, JPG, and WEBP supported. Images are never stored — processed entirely in-memory.',
  },
  {
    num: '02',
    icon: ScanLine,
    title: 'CNN Inference',
    description:
      'The image is preprocessed (RGB conversion, 256×256 resize, pixel normalization) then passed through a 4-layer CNN with 32→64→128→256 progressive feature maps and GlobalAveragePooling.',
  },
  {
    num: '03',
    icon: CheckCircle2,
    title: 'Instant Result',
    description:
      'The TFLite model (1.65MB) returns a classification with confidence score. Sub-100ms inference, under 200ms end-to-end via the Flask + Gunicorn REST API.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        backgroundColor: 'var(--color-canvas)',
        paddingTop: 'var(--spacing-section)',
        paddingBottom: 'var(--spacing-section)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div
          className="hairline-bottom"
          style={{ paddingBottom: '24px', marginBottom: '0' }}
        >
          <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '6px' }}>
            Process
          </p>
          <h2 className="heading-xl" style={{ color: 'var(--color-ink)' }}>
            How It Works
          </h2>
        </div>

        {/* Steps grid — 3 columns, hairline-divided */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid var(--color-hairline)' }}>
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`p-6 md:p-8 ${index < 2 ? 'md:border-r' : ''} border-b md:border-b-0`}
              style={{ borderColor: 'var(--color-hairline)' }}
            >
              {/* Step number */}
              <p
                className="body-strong"
                style={{ color: 'var(--color-hairline)', marginBottom: '24px' }}
              >
                {step.num}
              </p>

              {/* Icon in soft-cloud circle */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-soft-cloud)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <step.icon size={20} style={{ color: 'var(--color-ink)' }} />
              </div>

              <h3 className="heading-md" style={{ color: 'var(--color-ink)', marginBottom: '10px' }}>
                {step.title}
              </h3>
              <p className="body-md" style={{ color: 'var(--color-mute)' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
