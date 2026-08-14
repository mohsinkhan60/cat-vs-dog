import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-soft-cloud)',
        paddingTop: '56px', /* primary-nav height */
      }}
    >
      {/* ── Campaign tile — full-bleed editorial block ── */}
      <div
        className="relative w-full flex flex-col items-start justify-end"
        style={{
          minHeight: 'clamp(420px, 60vh, 680px)',
          backgroundColor: 'var(--color-ink)',
          padding: 'clamp(32px, 5vw, 64px)',
        }}
      >
        {/* Subtle editorial texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Floating pet emojis — editorial accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { emoji: '🐱', top: '12%', left: '62%', size: '7vw', opacity: 0.12 },
            { emoji: '🐶', top: '55%', left: '78%', size: '9vw', opacity: 0.09 },
            { emoji: '🐱', top: '70%', left: '55%', size: '5vw', opacity: 0.07 },
          ].map((item, i) => (
            <motion.span
              key={i}
              className="absolute select-none"
              style={{
                top: item.top,
                left: item.left,
                fontSize: item.size,
                opacity: item.opacity,
                lineHeight: 1,
              }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            >
              {item.emoji}
            </motion.span>
          ))}
        </div>

        {/* Display-campaign headline */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto">
          <motion.p
            className="caption-sm"
            style={{ color: 'var(--color-stone)', marginBottom: '16px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Deep Learning · Image Classification · CNN
          </motion.p>

          <motion.h1
            className="display-campaign"
            style={{ color: 'var(--color-canvas)', maxWidth: '820px' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            PetVision AI
          </motion.h1>

          <motion.p
            className="body-md"
            style={{
              color: 'var(--color-stone)',
              marginTop: '20px',
              maxWidth: '520px',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            A production deep learning platform trained on 25,000+ images using a custom 4-layer CNN
            (431,553 parameters). Sub-100ms inference via TensorFlow Lite — deployed on Vercel.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            style={{ marginTop: '32px' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="#predict" className="btn-outline-on-image">
              Classify an Image
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary"
              style={{ height: '48px' }}
            >
              How It Works
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip — below the campaign tile ── */}
      <div
        className="hairline-top"
        style={{ backgroundColor: 'var(--color-canvas)' }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ borderBottom: '1px solid var(--color-hairline)' }}
          >
            {[
              { value: '77%', label: 'Validation Accuracy' },
              { value: '<100ms', label: 'Inference Time' },
              { value: '25K+', label: 'Training Images' },
              { value: '1.65MB', label: 'TFLite Model Size' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col justify-center"
                style={{
                  padding: '20px 16px',
                  borderRight: [0, 2].includes(i) ? '1px solid var(--color-hairline)' : 'none',
                  borderTop: i >= 2 ? '1px solid var(--color-hairline)' : 'none',
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span
                  className="heading-xl"
                  style={{ color: 'var(--color-ink)', display: 'block', fontSize: 'clamp(20px, 4vw, 32px)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="caption-md"
                  style={{ color: 'var(--color-mute)', display: 'block', marginTop: '4px' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
