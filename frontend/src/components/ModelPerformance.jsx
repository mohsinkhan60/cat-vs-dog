import { motion } from 'framer-motion';

const metrics = [
  { label: 'Validation Accuracy', value: 77, suffix: '%', description: 'On 25,000-image dataset' },
  { label: 'Model Parameters', value: 431, suffix: 'K', description: '431,553 total params' },
  { label: 'TFLite Model Size', value: 1.65, suffix: 'MB', description: 'Optimized for cloud deployment' },
  { label: 'End-to-End Latency', value: 200, suffix: 'ms', description: 'Max response time on Vercel' },
];

const archStats = [
  { label: 'CNN Layers', value: '4' },
  { label: 'Feature Maps', value: '32→256' },
  { label: 'Epochs Trained', value: '25' },
  { label: 'Input Resolution', value: '256×256' },
];

export default function ModelPerformance() {
  return (
    <section
      id="performance"
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
          style={{ paddingBottom: '24px', marginBottom: '0' }}
        >
          <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '6px' }}>
            Metrics
          </p>
          <h2 className="heading-xl" style={{ color: 'var(--color-ink)' }}>
            Model Performance
          </h2>
        </div>

        {/* Metrics row — 4 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: '1px solid var(--color-hairline)' }}>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: 'var(--color-canvas)',
                padding: 'clamp(20px, 3vw, 32px)',
                borderRight: [0, 1, 2].includes(index) ? '1px solid var(--color-hairline)' : 'none',
                borderBottom: index < 2 ? '1px solid var(--color-hairline)' : 'none',
              }}
            >
              {/* Big number */}
              <p
                className="display-campaign"
                style={{
                  color: 'var(--color-ink)',
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  marginBottom: '4px',
                }}
              >
                {metric.value}{metric.suffix}
              </p>

              <p className="body-strong" style={{ color: 'var(--color-ink)', marginBottom: '4px' }}>
                {metric.label}
              </p>
              <p className="caption-md" style={{ color: 'var(--color-mute)', marginBottom: '20px' }}>
                {metric.description}
              </p>

              {/* Flat hairline progress bar — capped at 100 for visual */}
              <div className="confidence-bar-bg">
                <motion.div
                  className="confidence-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(metric.value, 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture overview row */}
        <div
          style={{
            backgroundColor: 'var(--color-canvas)',
            borderTop: '1px solid var(--color-hairline)',
          }}
        >
          <div
            style={{
              padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 32px)',
              borderBottom: '1px solid var(--color-hairline)',
            }}
          >
            <p className="body-strong" style={{ color: 'var(--color-ink)' }}>
              Architecture Overview — Custom CNN with Batch Normalization & Dropout
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {archStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  padding: 'clamp(16px, 2vw, 24px) clamp(16px, 3vw, 32px)',
                  borderRight: [0, 1, 2].includes(i) ? '1px solid var(--color-hairline)' : 'none',
                  borderBottom: i < 2 ? '1px solid var(--color-hairline)' : 'none',
                }}
              >
                <p className="heading-lg" style={{ color: 'var(--color-ink)', marginBottom: '2px' }}>
                  {stat.value}
                </p>
                <p className="caption-md" style={{ color: 'var(--color-mute)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
