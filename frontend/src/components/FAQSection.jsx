import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How accurate is the AI classifier?',
    answer:
      'Our model achieves approximately 95% accuracy on the standard Cats vs Dogs test dataset. The confidence score reflects the model\'s certainty for each prediction.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'We support all common image formats including PNG, JPG, JPEG, and WEBP. Images are resized to 256x256 pixels for optimal processing.',
  },
  {
    question: 'Is my image stored on your servers?',
    answer:
      'No. Images are processed in-memory solely for prediction and are never stored or logged. Your privacy is fully protected.',
  },
  {
    question: 'How does the AI work under the hood?',
    answer:
      'We use a deep convolutional neural network (CNN) trained on 25,000+ labeled images. The model learns visual patterns, textures, and features that distinguish cats from dogs.',
  },
  {
    question: 'Can I use this API for my own projects?',
    answer:
      'Yes! The Flask backend exposes a simple POST /predict endpoint. Send a multipart form with an image file and receive a JSON response.',
  },
  {
    question: 'Does it work on mobile devices?',
    answer:
      'Absolutely. The entire application is responsive and works perfectly on phones, tablets, and desktops of all sizes.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-50/30 dark:via-yellow-900/10 to-transparent" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to know about our AI classifier.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span className="font-semibold text-gray-800 dark:text-gray-100">{faq.question}</span>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-gray-400"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-14 sm:pl-14">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
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
