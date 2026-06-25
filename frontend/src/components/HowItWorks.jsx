import { motion } from 'framer-motion';
import { Upload, ScanLine, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Drag & drop or select a cat or dog photo from your device.',
  },
  {
    icon: ScanLine,
    title: 'AI Processing',
    description: 'Our neural network analyzes patterns, features, and textures.',
  },
  {
    icon: CheckCircle2,
    title: 'Get Prediction',
    description: 'Receive instant classification with confidence score.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 dark:via-purple-900/10 to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to classify any cat or dog image with AI precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+16px)] right-[calc(16.67%+16px)] h-0.5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-400 via-accent-purple to-accent-pink opacity-40 origin-left"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, y: -5 }}
                className="relative z-10 w-20 h-20 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30 mb-6"
              >
                <step.icon className="w-9 h-9 text-white" />
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-gray-900 text-sm font-bold flex items-center justify-center shadow-md text-primary-600 dark:text-primary-400">
                  {index + 1}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
