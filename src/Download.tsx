import { Download, Monitor, Laptop, ArrowLeft, Check } from 'lucide-react'

const LINUX_DOWNLOAD = 'https://github.com/pyrrho15/taimer-new/releases/download/v1.0.0/Taimer-1.0.0.AppImage'

function DownloadPage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-inner page-width">
          <a href="/" className="brand" aria-label="Taimer home">
            <span className="brand-mark"><span /></span>
            <span>taimer<span className="brand-dot">.</span></span>
          </a>
          <a href="/" className="text-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={15} /> Back to home
          </a>
        </div>
      </header>

      <main>
        <section className="section-pad" style={{ minHeight: 'calc(100vh - 76px)' }}>
          <div className="page-width">
            <div className="section-heading" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span className="section-kicker">DOWNLOAD TAIMER</span>
              <h2>Choose your platform</h2>
              <p>Get the desktop timer that stays out of your way.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
              {/* Windows Box */}
              <div className="download-box" style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Monitor size={40} style={{ color: '#5a7a5a' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '28px', marginBottom: '8px' }}>Windows</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Windows 10 or later</p>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    disabled
                    className="button button-dark"
                    style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '16px', opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    <Download size={17} /> Coming soon for Windows
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', color: 'var(--muted)' }}>
                    <Check size={14} /> Free & open source
                  </div>
                </div>
              </div>

              {/* Linux Box */}
              <div className="download-box" style={{
                background: 'var(--paper)',
                border: '1px solid var(--line)',
                borderRadius: '16px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--green)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Laptop size={40} style={{ color: '#5a7a5a' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '28px', marginBottom: '8px' }}>Linux</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Ubuntu, Fedora, Debian, and more</p>
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <a
                    href={LINUX_DOWNLOAD}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-dark"
                    style={{ width: '100%', justifyContent: 'center', padding: '16px 24px', fontSize: '16px' }}
                  >
                    <Download size={17} /> Download for Linux
                  </a>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '14px', color: 'var(--muted)' }}>
                    <Check size={14} /> Free & open source
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DownloadPage
