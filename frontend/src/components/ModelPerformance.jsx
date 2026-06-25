import { motion } from 'framer-motion';

const metrics = [
  { label: 'Accuracy', value: 95, suffix: '%', description: 'On test dataset' },
  { label: 'Precision', value: 94, suffix: '%', description: 'Cat classification' },
  { label: 'Recall', value: 96, suffix: '%', description: 'Dog classification' },
  { label: 'Training Images', value: 25, suffix: 'K+', description: 'Balanced dataset' },
];

export default function ModelPerformance() {
  return (
    <section id="performance" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-50/30 dark:via-cyan-900/10 to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Model Performance</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Our model achieves state-of-the-art accuracy on the challenging Cats vs Dogs dataset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-6 text-center group"
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                {metric.value}{metric.suffix}
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {metric.label}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                {metric.description}
              </p>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 glass-card rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
            Training Dataset Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {['Total Images', 'Cat Images', 'Dog Images', 'Epochs Trained'].map((label, i) => (
              <div key={label} className="p-4">
                <p className="text-2xl font-bold gradient-text">{[25000, 12500, 12500, 25][i]}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
