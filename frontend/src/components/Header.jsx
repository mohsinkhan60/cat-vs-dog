import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme.jsx';

export default function Header() {
  const { theme, toggle } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass border-b border-white/10 dark:border-gray-700/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-lg">🤖</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-purple bg-clip-text text-transparent">
                AI Classifier
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'Predict', href: '#predict' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'Performance', href: '#performance' },
                { name: 'Features', href: '#features' },
                { name: 'FAQ', href: '#faq' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:border-primary-300 dark:hover:border-primary-600 transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
