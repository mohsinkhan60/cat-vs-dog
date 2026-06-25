import { motion } from 'framer-motion';
import { ArrowDown, Cat, Dog } from 'lucide-react';
import UploadSection from './UploadSection';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950/30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10 dark:opacity-5"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -5, 0],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          >
            {i % 2 === 0 ? '🐱' : '🐶'}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block text-gray-900 dark:text-white">AI Cat vs Dog</span>
            <span className="block gradient-text">Classifier</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload an image and let our AI instantly determine whether it's a{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
              <Cat className="w-5 h-5 text-orange-500" /> cat
            </span>{' '}
            or a{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-gray-800 dark:text-gray-200">
              <Dog className="w-5 h-5 text-amber-600" /> dog
            </span>
            . Powered by deep learning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <a href="#predict" className="btn-primary text-base">
              Upload Image
            </a>
            <button
              onClick={() => document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary text-base"
            >
              Try Demo
            </button>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <a href="#how-it-works" className="inline-flex flex-col items-center gap-1 text-gray-400 hover:text-primary-500 transition-colors">
              <span className="text-xs font-medium tracking-wider uppercase">Scroll to learn more</span>
              <ArrowDown className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
