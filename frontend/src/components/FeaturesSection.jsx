import { motion } from 'framer-motion';
import { Layers, Zap, Server, Shield, Globe, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Layers,
    title: '4-Layer Custom CNN',
    description:
      'Progressive feature maps (32→64→128→256 filters) with batch normalization and dropout regularization layers — 431,553 parameters optimized for binary classification.',
  },
  {
    icon: Zap,
    title: 'Sub-100ms Inference',
    description:
      'Model converted to TensorFlow Lite (1.65MB) for fast inference. Under 200ms end-to-end response time from upload to result on Vercel.',
  },
  {
    icon: Server,
    title: 'Flask REST API',
    description:
      'RESTful Flask backend with image preprocessing pipeline (RGB conversion, 256×256 resizing, pixel normalization), CORS configuration, and Gunicorn WSGI server.',
  },
  {
    icon: Shield,
    title: 'Zero Data Retention',
    description:
      'Images are processed entirely in-memory and never written to disk or logged. No user data is stored at any point in the pipeline.',
  },
  {
    icon: Globe,
    title: 'React 19 + Vite Frontend',
    description:
      'Built with React 19, Vite, and TailwindCSS 4. Deployed on Vercel with global CDN distribution and optimized asset bundling.',
  },
  {
    icon: RefreshCw,
    title: 'Complete ML Workflow',
    description:
      'Full pipeline from data collection and model training on 25,000+ Kaggle images through to cloud deployment — implementing the complete ML production lifecycle.',
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
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
            Tech Stack
          </p>
          <h2 className="heading-xl" style={{ color: 'var(--color-ink)' }}>
            Built For Production
          </h2>
        </div>

        {/* 3-column feature grid — category-icon-card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ borderTop: '1px solid var(--color-hairline)' }}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 md:p-8 border-b"
              style={{
                backgroundColor: 'var(--color-canvas)',
                borderColor: 'var(--color-hairline)',
                borderRight:
                  index % 3 !== 2 ? '1px solid var(--color-hairline)' : 'none',
              }}
            >
              {/* Icon on soft-cloud circle */}
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
                <feature.icon size={20} style={{ color: 'var(--color-ink)' }} />
              </div>

              <h3 className="heading-md" style={{ color: 'var(--color-ink)', marginBottom: '8px' }}>
                {feature.title}
              </h3>
              <p className="body-md" style={{ color: 'var(--color-mute)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
