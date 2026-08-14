import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Classify', href: '#predict' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Performance', href: '#performance' },
  { label: 'Tech Stack', href: '#features' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Primary nav */}
        <div
          className="sticky-inset-bottom"
          style={{ backgroundColor: 'var(--color-canvas)', height: '56px', display: 'flex', alignItems: 'center' }}
        >
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-8 flex items-center justify-between">
            {/* Logo / brand */}
            <a
              href="#"
              className="flex items-center gap-2 no-underline"
              aria-label="PetVision AI home"
              onClick={closeMenu}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>🐾</span>
              <span className="body-strong" style={{ color: 'var(--color-ink)', letterSpacing: '-0.01em' }}>
                PetVision AI
              </span>
            </a>

            {/* Center nav links — desktop only */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="body-strong transition-opacity hover:opacity-60"
                  style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              <a
                href="#predict"
                className="btn-primary hidden sm:inline-flex"
                style={{ height: '40px', padding: '0 20px', fontSize: '14px' }}
              >
                Classify Image
              </a>

              {/* Hamburger — mobile only */}
              <button
                className="btn-icon-circular md:hidden"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? (
                  <X size={18} />
                ) : (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
                    <rect y="0" width="18" height="2" fill="currentColor" />
                    <rect y="6" width="18" height="2" fill="currentColor" />
                    <rect y="12" width="18" height="2" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer — full-width dropdown below the nav bar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 md:hidden"
              style={{ backgroundColor: 'rgba(17,17,17,0.4)', top: '56px' }}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 right-0 z-50 md:hidden"
              style={{
                top: '56px',
                backgroundColor: 'var(--color-canvas)',
                borderBottom: '1px solid var(--color-hairline)',
              }}
            >
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map((item, i) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center body-strong transition-opacity hover:opacity-60"
                    style={{
                      color: 'var(--color-ink)',
                      textDecoration: 'none',
                      padding: '16px 24px',
                      borderTop: i === 0 ? 'none' : '1px solid var(--color-hairline-soft)',
                    }}
                  >
                    {item.label}
                  </a>
                ))}

                {/* CTA inside drawer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-hairline)' }}>
                  <a
                    href="#predict"
                    className="btn-primary w-full justify-center"
                    onClick={closeMenu}
                    style={{ fontSize: '14px', height: '44px' }}
                  >
                    Classify Image
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
