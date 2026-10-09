import { useEffect, useRef, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ArrowDown, ArrowDownRight, ArrowRight, Check, Clock3, Command, Download, Github, Laptop, Menu, Monitor, Pause, Play, Pin, ShieldCheck, Sparkles, TimerReset, X, Zap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DownloadPage from './Download'

gsap.registerPlugin(ScrollTrigger)

const RELEASES = 'https://github.com/pyrrho15/taimer-new/releases'
const REPO = 'https://github.com/pyrrho15/taimer-new'

const steps = [
  { n: '01', title: 'Open Taimer', text: 'Launch it like any other desktop app. No account, workspace, or setup ritual.' },
  { n: '02', title: 'Press play', text: 'Start a focus session, pause for a break, or reset when you’re ready for a clean slate.' },
  { n: '03', title: 'Keep moving', text: 'Pin it above your windows and let the clock quietly keep you aware of your time.' },
]

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#top" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Taimer home"><span className="brand-mark"><span /></span><span>taimer<span className="brand-dot">.</span></span></a>
}

function TimerMockup() {
  const [running, setRunning] = useState(true)
  const [seconds, setSeconds] = useState(18 * 60 + 42)
  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setSeconds(s => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [running])
  const time = `${String(Math.floor(seconds / 3600)).padStart(2, '0')}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
  return <div className="mockup-wrap" aria-label="Interactive preview of the Taimer desktop timer">
    <div className="mockup-halo" />
    <div className="mockup-window">
      <div className="mockup-titlebar"><div className="window-dots"><i /><i /><i /></div><span>TAIMER / FOCUS SESSION</span><div className="live-status"><span /> {running ? 'RUNNING' : 'PAUSED'}</div></div>
      <div className="mockup-body"><div className="mockup-label"><span className="mini-icon"><Clock3 size={13} /></span> YOUR TIME, IN VIEW <span className="mockup-line" /></div>
        <div className="timer-digits">{time}</div><div className="mockup-caption">A little more focus. A little less friction.</div>
        <div className="mockup-controls"><button className="mock-play" onClick={() => setRunning(!running)} aria-label={running ? 'Pause preview timer' : 'Start preview timer'}>{running ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}{running ? 'Pause session' : 'Resume session'}</button><button className="mock-reset" onClick={() => { setSeconds(0); setRunning(false) }} aria-label="Reset preview timer"><TimerReset size={16} /></button><span className="mock-pinned"><Pin size={13} fill="currentColor" /> Always on top</span></div>
      </div>
      <div className="mockup-bottom"><span><span className="green-dot" /> LOCAL SESSION</span><span>NO ACCOUNT NEEDED</span><span>V 1.0</span></div>
    </div>
    <div className="float-note note-one"><span className="note-icon"><Pin size={15} /></span><span><b>Stays in view</b><small>Even when you switch apps</small></span></div>
    <div className="float-note note-two"><span className="note-icon note-icon-green"><Check size={15} /></span><span><b>Your pace, your rules</b><small>Start · pause · reset</small></span></div>
    <div className="mockup-cross cross-one">+</div><div className="mockup-cross cross-two">+</div>
  </div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro.from('.nav-inner', { y: -18, opacity: 0, duration: .7 })
        .from('.hero-eyebrow', { y: 16, opacity: 0, duration: .5 }, '-=.25')
        .from('.hero-title-line', { yPercent: 110, opacity: 0, duration: .85, stagger: .12 }, '-=.2')
        .from('.hero-copy, .hero-actions, .hero-footnote', { y: 18, opacity: 0, duration: .6, stagger: .1 }, '-=.35')
        .from('.mockup-window', { y: 30, opacity: 0, rotateX: 5, duration: 1 }, '-=.65')
        .from('.float-note', { scale: .92, opacity: 0, duration: .5, stagger: .12 }, '-=.45')
      gsap.to('.mockup-halo', { scale: 1.08, opacity: .7, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.float-note.note-one', { y: -7, duration: 2.7, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.float-note.note-two', { y: 7, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.from(el, { y: 32, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } })
      })
      gsap.utils.toArray<HTMLElement>('.feature-card').forEach((el, i) => {
        gsap.from(el, { y: 28, opacity: 0, duration: .7, delay: (i % 2) * .08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
      })
      gsap.from('.step-line-fill', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: '.steps-grid', start: 'top 72%', once: true } })
      gsap.from('.use-card', { y: 24, opacity: 0, duration: .65, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.use-grid', start: 'top 82%', once: true } })
      gsap.to('.hero-orbit', { rotation: 360, duration: 65, repeat: -1, ease: 'none' })
    }, root)
    return () => ctx.revert()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); if (email.trim()) setSubscribed(true) }

  return <Routes>
    <Route path="/" element={<div ref={root} className="site-shell" id="top">
      <div className="announcement"><span className="announcement-dot" /> A small tool for a more intentional workday <Link to="/download" onClick={closeMenu}>Get Taimer <ArrowRight size={13} /></Link></div>
      <header className="site-header"><div className="nav-inner page-width"><Brand /><nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}><a href="#how-it-works" onClick={closeMenu}>How it works</a><a href="#use-cases" onClick={closeMenu}>Who it's for</a><a href={REPO} target="_blank" rel="noreferrer" onClick={closeMenu} className="nav-github"><Github size={16} /> GitHub</a><Link to="/download" onClick={closeMenu} className="button button-dark nav-download">Download <ArrowDownRight size={15} /></Link></nav><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></div></header>

      <main>
        <section className="hero section-pad"><div className="hero-orbit"><span /><span /><span /></div><div className="page-width hero-grid"><div className="hero-content"><div className="hero-eyebrow"><span className="eyebrow-spark"><Sparkles size={13} /></span> THE DESKTOP TIMER THAT GETS IT</div><h1><span className="hero-title-line">Keep your time</span><span className="hero-title-line title-second">in <em>view.</em></span></h1><p className="hero-copy">A tiny, always-on-top timer for your desktop. Stay aware of where your time goes — without breaking your flow to check.</p><div className="hero-actions"><a href={RELEASES} target="_blank" rel="noreferrer" className="button button-dark button-large"><Download size={17} /> Download Taimer <ArrowRight size={16} /></a><a href="#how-it-works" className="text-link">See how it works <ArrowDown size={15} /></a></div><div className="hero-footnote"><span className="platform-icon"><Monitor size={14} /></span> Windows & Linux <span className="foot-separator">·</span> <span className="open-source"><Github size={13} /> Open source</span></div></div><div className="hero-visual"><TimerMockup /></div></div><div className="hero-bottom page-width"><span>TIME, WITHOUT THE TAB SWITCHING.</span><a href="#overview">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div></section>

        <section className="social-proof section-pad-sm"><div className="page-width social-inner"><div className="social-label"><span className="social-kicker">MADE FOR REAL WORK</span><p>Less ceremony.<br />More getting into it.</p></div><div className="proof-item"><span className="proof-icon"><Pin size={18} /></span><div><b>Always on top</b><small>Right where you need it</small></div></div><div className="proof-item"><span className="proof-icon"><Zap size={18} /></span><div><b>Lightweight</b><small>Small window, small footprint</small></div></div><div className="proof-item"><span className="proof-icon"><ShieldCheck size={18} /></span><div><b>Local by design</b><small>No account to get started</small></div></div><div className="proof-note">A focused little utility.<br /><span>Nothing more, nothing less.</span></div></div></section>

        <section className="overview section-pad" id="overview"><div className="page-width overview-grid"><div className="overview-heading reveal"><span className="section-kicker">01 / THE IDEA</span><h2>Time is happening.<br /><em>Keep it visible.</em></h2></div><div className="overview-copy reveal"><p>Most timers ask you to leave what you’re doing to see them. Taimer flips that around.</p><p>It lives quietly above your other windows, giving your time a place in your peripheral vision. Start, pause, reset. Then get back to the thing that matters.</p><a href="#how-it-works" className="underlined-link">See how it works <ArrowRight size={15} /></a></div><div className="overview-aside reveal"><div className="aside-quote-mark">“</div><p>Useful tools should make the work feel lighter, not add another thing to manage.</p><span>THE TAIMER PRINCIPLE</span></div></div></section>

        <section className="steps-section section-pad" id="how-it-works"><div className="page-width"><div className="section-heading reveal"><div><span className="section-kicker">03 / THE ROUTINE</span><h2>Three steps.<br /><em>Then you’re off.</em></h2></div><p>From download to deep work<br />in less time than a coffee run.</p></div><div className="steps-grid"><div className="step-line"><div className="step-line-fill" /></div>{steps.map((step, i) => <article className="step-card reveal" key={step.n}><span className="step-number">{step.n}</span><div className="step-icon">{i === 0 ? <Laptop size={20} /> : i === 1 ? <Play size={20} /> : <Pin size={20} />}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="steps-bottom reveal"><span><Command size={15} /> No account. No clutter. No fuss.</span><a href={RELEASES} target="_blank" rel="noreferrer" className="underlined-link">Get started <ArrowRight size={15} /></a></div></div></section>

        <section className="use-section section-pad" id="use-cases"><div className="page-width"><div className="section-heading reveal"><div><span className="section-kicker">04 / MADE TO FIT YOUR DAY</span><h2>Whatever you’re in.<br /><em>Stay with it.</em></h2></div><p>Taimer doesn’t tell you how to work.<br />It just helps you notice the time.</p></div><div className="use-grid"><article className="use-card use-card-dark"><div className="use-card-top"><span>01 — DEEP WORK</span><span className="use-icon"><Command size={17} /></span></div><div className="use-art focus-art"><div className="focus-ring ring-a" /><div className="focus-ring ring-b" /><div className="focus-center"><span>IN THE ZONE</span><b>25:00</b></div></div><div className="use-card-copy"><h3>For the focus blocks</h3><p>Keep a gentle eye on the clock without opening one more tab.</p></div><ArrowDownRight className="use-arrow" size={18} /></article><article className="use-card use-card-sage"><div className="use-card-top"><span>02 — CREATIVE FLOW</span><span className="use-icon"><Sparkles size={17} /></span></div><div className="use-art creative-art"><div className="creative-window"><div className="creative-bar"><i /><i /><i /></div><div className="creative-content"><span>TIME SPENT MAKING</span><b>01:14:32</b><div className="creative-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div></div><div className="creative-spark spark-a">✳</div><div className="creative-spark spark-b">✳</div></div><div className="use-card-copy"><h3>For the makers</h3><p>Notice how long the work takes, without interrupting the making.</p></div><ArrowDownRight className="use-arrow" size={18} /></article><article className="use-card use-card-peach"><div className="use-card-top"><span>03 — EVERYDAY TASKS</span><span className="use-icon"><Clock3 size={17} /></span></div><div className="use-art everyday-art"><div className="task-paper"><span>THE LITTLE LIST</span><div><i /><b>Write</b><i /><b>Plan</b><i /><b>Do</b></div></div><div className="task-clock"><span>00:08:42</span><Pause size={12} /></div></div><div className="use-card-copy"><h3>For the everyday</h3><p>A gentle nudge to stay present with the small things.</p></div><ArrowDownRight className="use-arrow" size={18} /></article></div></div></section>

        <section className="testimonial-section section-pad-sm"><div className="page-width testimonial-inner reveal"><div className="testimonial-mark">“</div><div className="testimonial-copy"><span className="section-kicker">A DIFFERENT KIND OF PRODUCTIVITY TOOL</span><blockquote>“The best timer is the one you don’t have to keep looking for.”</blockquote><div className="testimonial-attribution"><span className="attribution-line" /><span>THE IDEA BEHIND TAIMER</span></div></div><div className="testimonial-stamp"><span>LESS<br />SWITCHING</span><ArrowDownRight size={20} /></div></div></section>

        <section className="cta-section section-pad"><div className="page-width"><div className="cta-card reveal"><div className="cta-decoration"><span /><span /><span /></div><div className="cta-content"><span className="section-kicker">MAKE ROOM FOR YOUR WORK</span><h2>Your time.<br /><em>Back in view.</em></h2><p>Get the little timer that stays out of your way and keeps you in the loop.</p><div className="cta-actions"><a href={RELEASES} target="_blank" rel="noreferrer" className="button button-light button-large"><Download size={17} /> Download for desktop <ArrowRight size={16} /></a><a href={REPO} target="_blank" rel="noreferrer" className="cta-source"><Github size={15} /> Explore the source</a></div><div className="cta-platforms"><span><Monitor size={14} /> Windows</span><i /> <span><Laptop size={14} /> Linux</span><i /> <span><Check size={14} /> Free & open source</span></div></div><div className="cta-art"><div className="cta-clock"><span>YOUR TIME, IN VIEW</span><b>00:25:00</b><div><span /><span /><span /></div></div><div className="cta-orbit orbit-one" /><div className="cta-orbit orbit-two" /></div></div></div></section>

        <section className="newsletter-section section-pad-sm" id="newsletter"><div className="page-width newsletter-inner"><div className="newsletter-copy"><span className="section-kicker">OCCASIONAL NOTES, NOT NOISE</span><h2>A little note<br />from <em>Taimer.</em></h2><p>Product updates and thoughtful ways to work. Only when there's something worth sharing.</p></div><div className="newsletter-form-wrap">{subscribed ? <div className="success-message"><span><Check size={18} /></span><div><b>You're on the list.</b><p>Thanks for your interest in Taimer.</p></div></div> : <form className="newsletter-form" onSubmit={handleSubscribe}><label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label><div className="email-input-wrap"><input id="newsletter-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /><button type="submit" aria-label="Subscribe to newsletter"><ArrowRight size={18} /></button></div><p className="form-note">No spam, no weekly obligations. Unsubscribe whenever.</p></form>}<div className="newsletter-side-note"><span className="newsletter-spark">✳</span> Made for people who like<br />their tools quiet.</div></div></div></section>
      </main>

      <footer className="site-footer"><div className="page-width"><div className="footer-main"><div className="footer-brand"><Brand /><p>A small timer for the work<br />you want to be present for.</p></div><div className="footer-links"><div><span>EXPLORE</span><a href="#overview">The idea</a><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#use-cases">Use cases</a></div><div><span>TAIMER</span><a href={RELEASES} target="_blank" rel="noreferrer">Releases <ArrowRight size={12} /></a><a href={REPO} target="_blank" rel="noreferrer">GitHub <ArrowRight size={12} /></a><a href="#newsletter">Newsletter</a></div></div><a className="back-top" href="#top" aria-label="Back to top"><ArrowDown size={17} /></a></div><div className="footer-bottom"><span> {new Date().getFullYear()} TAIMER. MADE FOR YOUR FLOW.</span><span>LESS DISTRACTION. MORE INTENTION.</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>
    </div>} />
    <Route path="/download" element={<DownloadPage />} />
  </Routes>
}

export default App
