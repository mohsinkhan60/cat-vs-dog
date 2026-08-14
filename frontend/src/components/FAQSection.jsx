import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What validation accuracy does PetVision AI achieve?',
    answer:
      '77% validation accuracy on the 25,000-image Kaggle Cats vs Dogs dataset. The model uses a custom 4-layer CNN with 431,553 parameters, batch normalization, and dropout regularization layers specifically optimized for binary image classification.',
  },
  {
    question: 'How is the model architecture structured?',
    answer:
      'PetVision AI uses a custom convolutional neural network with progressive feature maps — 32→64→128→256 filters — across 4 convolutional layers, followed by GlobalAveragePooling. Batch normalization is applied after each conv block and dropout regularization prevents overfitting during the 25-epoch training run.',
  },
  {
    question: 'How fast is the inference?',
    answer:
      'Sub-100ms inference time. The model is exported to TensorFlow Lite format (1.65MB) which enables fast, lightweight inference. End-to-end response time — from image upload to result returned — is under 200ms.',
  },
  {
    question: 'What image preprocessing does the API apply?',
    answer:
      'The Flask REST API applies a standard preprocessing pipeline: RGB conversion, resizing to 256×256 pixels, and pixel normalization (scaling values to [0, 1]). This matches the preprocessing applied during training to ensure consistent inference results.',
  },
  {
    question: 'Is my image stored or logged?',
    answer:
      'No. Images are processed entirely in-memory for the duration of the prediction request and are never written to disk, logged, or retained in any form. The API is stateless — each request is independent.',
  },
  {
    question: 'How can I call the API directly?',
    answer:
      'The Flask backend exposes a POST /predict endpoint. Send a multipart/form-data request with an image field containing the image file. The response is JSON with prediction (\"Cat\" or \"Dog\") and confidence (float 0–1). The Gunicorn WSGI server handles production traffic.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      id="faq"
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
            FAQ
          </p>
          <h2 className="heading-xl" style={{ color: 'var(--color-ink)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ rows — faq-row accordion pattern */}
        <div style={{ backgroundColor: 'var(--color-canvas)' }}>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="hairline-bottom"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left"
                style={{ padding: 'clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)', background: 'none', border: 'none', cursor: 'pointer' }}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="heading-md" style={{ color: 'var(--color-ink)', flex: 1, marginRight: '24px' }}>
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flexShrink: 0, color: 'var(--color-ink)', display: 'flex' }}
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="body-md"
                      style={{
                        color: 'var(--color-charcoal)',
                        padding: '0 clamp(16px, 4vw, 32px) clamp(16px, 2vw, 24px)',
                        maxWidth: '720px',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
