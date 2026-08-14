import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-canvas)' }}>
      <div className="hairline-top">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          {/* 4-column links grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ padding: '48px 0 40px', borderBottom: '1px solid var(--color-hairline)' }}
          >
            {/* Col 1 — Brand */}
            <div style={{ paddingRight: '24px', paddingBottom: '8px' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '14px' }}>
                <span style={{ fontSize: '20px', lineHeight: 1 }}>🐾</span>
                <span className="body-strong" style={{ color: 'var(--color-ink)' }}>
                  PetVision AI
                </span>
              </div>
              <p className="caption-md" style={{ color: 'var(--color-mute)', maxWidth: '240px' }}>
                Deep learning image classification platform. Custom 4-layer CNN trained on 25,000+ images — deployed on Vercel with sub-100ms inference.
              </p>

              {/* Tech badge row */}
              <div className="flex flex-wrap gap-2" style={{ marginTop: '16px' }}>
                {['React 19', 'Flask', 'TensorFlow', 'CNN'].map((tag) => (
                  <span
                    key={tag}
                    className="caption-sm"
                    style={{
                      color: 'var(--color-mute)',
                      border: '1px solid var(--color-hairline)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '3px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2 — Navigate */}
            <div>
              <p className="body-strong" style={{ color: 'var(--color-ink)', marginBottom: '16px' }}>
                Navigate
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Classify', href: '#predict' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Performance', href: '#performance' },
                  { label: 'Tech Stack', href: '#features' },
                  { label: 'FAQ', href: '#faq' },
                ].map((link) => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <a
                      href={link.href}
                      className="caption-md transition-opacity hover:opacity-60"
                      style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Resources */}
            <div>
              <p className="body-strong" style={{ color: 'var(--color-ink)', marginBottom: '16px' }}>
                Resources
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'POST /predict API', href: '#faq' },
                  { label: 'Model Architecture', href: '#performance' },
                  { label: 'Kaggle Dataset', href: 'https://www.kaggle.com/c/dogs-vs-cats', external: true },
                  { label: 'Source Code', href: 'https://github.com/mohsinkhan60', external: true },
                ].map((link) => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="caption-md transition-opacity hover:opacity-60 inline-flex items-center gap-1"
                      style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                    >
                      {link.label}
                      {link.external && <ExternalLink size={11} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Connect */}
            <div>
              <p className="body-strong" style={{ color: 'var(--color-ink)', marginBottom: '16px' }}>
                Connect
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                  <a
                    href="https://github.com/mohsinkhan60"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caption-md transition-opacity hover:opacity-60 inline-flex items-center gap-2"
                    style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </li>
                <li style={{ marginBottom: '10px' }}>
                  <a
                    href="https://www.linkedin.com/in/mohsinkhandev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caption-md transition-opacity hover:opacity-60 inline-flex items-center gap-2"
                    style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://mohsinkhandev.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caption-md transition-opacity hover:opacity-60 inline-flex items-center gap-2"
                    style={{ color: 'var(--color-mute)', textDecoration: 'none' }}
                  >
                    <ExternalLink size={13} />
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Fine-print row */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ padding: '20px 0' }}
          >
            <p className="utility-xs" style={{ color: 'var(--color-mute)' }}>
              © {year} PetVision AI. All rights reserved.
            </p>
            <p className="utility-xs" style={{ color: 'var(--color-stone)' }}>
              React 19 · Flask · TensorFlow · TFLite · Gunicorn · Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
