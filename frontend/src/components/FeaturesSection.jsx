import { motion } from 'framer-motion';
import { Zap, MonitorSmartphone, Brain, Shield, Gauge, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get predictions in under 2 seconds with our optimized deep learning model.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive Design',
    description: 'Seamless experience across desktop, tablet, and mobile devices.',
  },
  {
    icon: Brain,
    title: 'AI Powered',
    description: 'State-of-the-art convolutional neural network trained on 25K+ images.',
  },
  {
    icon: Shield,
    title: 'Secure Uploads',
    description: 'Images are processed in memory and never stored on our servers.',
  },
  {
    icon: Gauge,
    title: 'Real-time Results',
    description: 'Instant feedback with confidence scores displayed immediately.',
  },
  {
    icon: RefreshCw,
    title: 'High Accuracy',
    description: 'Consistent 95%+ accuracy across diverse image conditions and breeds.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/30 dark:via-pink-900/10 to-transparent" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Why Choose Us</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Built with cutting-edge technology to deliver the best classification experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card rounded-2xl p-6 group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-5 shadow-lg shadow-primary-500/20 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-shadow">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
