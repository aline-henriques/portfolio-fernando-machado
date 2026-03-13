"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import TypeWriter from "@/components/TypeWriter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translation";

const flags: { lang: Language; src: string; alt: string }[] = [
  { lang: "pt", src: "/images/brasil.png", alt: "Brasil" },
  { lang: "en", src: "/images/usa.png", alt: "USA" },
  { lang: "fr", src: "/images/frança.png", alt: "França" },
];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0)" : transforms[direction],
      transition: `opacity 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ── SCANLINE OVERLAY (decorativo) ── */
function ScanLines() {
  return <div className="scanlines" aria-hidden />;
}

/* ── COUNTER ANIMADO ── */
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const { ref, visible } = useReveal(0.5);
  return <span ref={ref} className={`stat-num-inner ${visible ? "counted" : ""}`}>{value}{suffix}</span>;
}

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState("home");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* parallax sutil no hero */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  /* active section tracker */
  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    {
      num: "001",
      titleKey: "project-drone-title",
      textKey: "project-drone-text",
      img: "/images/drone.jpg",
      tags: ["Controle PID", "Sensores", "Python"],
      soon: false,
    },
    {
      num: "002",
      titleKey: "project-boat-title",
      textKey: "project-boat-text",
      img: "/images/boat.jpg",
      tags: ["IoT", "Arduino", "LoRa"],
      soon: false,
    },
    {
      num: "003",
      titleKey: "project-soon-title",
      textKey: "project-soon-text",
      img: "",
      tags: [],
      soon: true,
    },
    {
      num: "004",
      titleKey: "project-soon-title",
      textKey: "project-soon-text",
      img: "",
      tags: [],
      soon: true,
    },
  ];

  const VISIBLE = 2;
  const maxIndex = projects.length - VISIBLE;

  const navigate = useCallback((dir: 1 | -1) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCarouselIndex((prev) => Math.max(0, Math.min(prev + dir, maxIndex)));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, maxIndex]);

  const navLinks = [
    { id: "home",     label: t("menu-home") },
    { id: "about",    label: t("menu-about") },
    { id: "projects", label: t("menu-projects") },
  ];

  const stats = [
    { num: "3+", label: t("stat-study") },
    { num: "2",  label: t("stat-countries") },
    { num: "∞",  label: t("stat-systems") },
    { num: "Open", label: t("stat-open"), dot: true },
  ];

  return (
    <>
      <div className="grid-bg" />
      <ScanLines />

      {/* ── NAVBAR ── */}
      <header className="header">
        <button className="nav-logo" onClick={() => scrollTo("home")}>
          <span className="logo-bracket">[</span>
          <span>FMN</span>
          <span className="logo-bracket">]</span>
        </button>
        <nav className="navegacao">
          <div className="language-selector">
            {flags.map(({ lang, src, alt }) => (
              <button key={lang} onClick={() => setLanguage(lang)}
                className={`flag-btn ${language === lang ? "active" : ""}`} aria-label={alt}>
                <Image src={src} alt={alt} width={28} height={28} className="flag" />
              </button>
            ))}
          </div>
          {navLinks.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`nav-link ${activeSection === id ? "nav-link--active" : ""}`}>
              {label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => scrollTo("contact")}>
            {t("menu-contact")}
          </button>
        </nav>
      </header>

      <main>
        {/* ── HERO ── */}
        <section id="home" className="hero">
          {/* Radar decorativo */}
          <div className="radar-wrap" aria-hidden
            style={{ transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)` }}>
            <div className="radar">
              <div className="radar-sweep" />
              {[40, 80, 130, 190].map((r) => (
                <div key={r} className="radar-ring" style={{ width: r * 2, height: r * 2,
                  marginLeft: -r, marginTop: -r }} />
              ))}
              {/* Blips */}
              {[
                { top: "28%", left: "55%", delay: "0.3s" },
                { top: "60%", left: "70%", delay: "1.1s" },
                { top: "45%", left: "38%", delay: "2s" },
              ].map((b, i) => (
                <div key={i} className="radar-blip" style={{ top: b.top, left: b.left, animationDelay: b.delay }} />
              ))}
            </div>
          </div>

          <div className="hero-inner">
            <div className="hero-badge fade-in-1">
              <span className="hero-badge-dot" />
              {t("hero-available")}
            </div>
            <h1 id="h1-fernando" className="fade-in-2">
              <TypeWriter text="Fernando Machado." speed={90} />
            </h1>
            <p id="h2-profissao" className="fade-in-3">
              <span className="terminal-prompt">~/</span>
              <span className="cursor-text">{t("profession")}</span>
              <span className="cursor">▋</span>
            </p>
            <p className="hero-desc fade-in-4">{t("hero-desc")}</p>
            <div className="hero-actions fade-in-5">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                {t("hero-cta-projects")}
              </button>
              <button className="btn-ghost" onClick={() => scrollTo("contact")}>
                {t("hero-cta-contact")}
              </button>
            </div>
          </div>

          {/* Circuit SVG com parallax */}
          <div className="hero-visual fade-in-6" aria-hidden
            style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}>
            <svg viewBox="0 0 400 400" fill="none">
              <path d="M200 40 L200 120 L280 120 L280 200 L360 200" stroke="#C9933A" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6"/>
              <path d="M200 40 L200 120 L120 120 L120 280 L40 280" stroke="#3A7BC9" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4"/>
              <path d="M200 360 L200 280 L320 280 L320 160" stroke="#C9933A" strokeWidth="1" strokeDasharray="4 2" opacity="0.3"/>
              <path d="M200 360 L200 280 L80 280 L80 160 L160 160" stroke="#3A7BC9" strokeWidth="1" strokeDasharray="4 2" opacity="0.3"/>
              <circle cx="200" cy="200" r="90" stroke="#C9933A" strokeWidth="0.5" strokeDasharray="8 4" opacity="0.3"/>
              <circle cx="200" cy="200" r="140" stroke="#3A7BC9" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2"/>
              <circle cx="200" cy="200" r="28" fill="rgba(201,147,58,0.1)" stroke="#C9933A" strokeWidth="1.5"/>
              <circle cx="200" cy="200" r="16" fill="rgba(201,147,58,0.2)" stroke="#C9933A" strokeWidth="1"/>
              <circle cx="200" cy="200" r="6" fill="#C9933A"/>
              {[
                [280,120,"#C9933A"],[120,120,"#3A7BC9"],
                [120,280,"#C9933A"],[280,280,"#3A7BC9"],
                [200,40,"#C9933A"],[200,360,"#C9933A"],
              ].map(([cx,cy,fill], i) => (
                <circle key={i} cx={cx as number} cy={cy as number} r="4" fill={fill as string} opacity="0.7"/>
              ))}
              <rect x="248" y="96" width="32" height="20" rx="2" fill="rgba(201,147,58,0.1)" stroke="#C9933A" strokeWidth="0.8" opacity="0.7"/>
              <rect x="104" y="268" width="32" height="20" rx="2" fill="rgba(58,123,201,0.1)" stroke="#3A7BC9" strokeWidth="0.8" opacity="0.7"/>
              /* Animated data packets */
              <circle className="data-packet pkt-1" cx="0" cy="0" r="3" fill="#C9933A"/>
              <circle className="data-packet pkt-2" cx="0" cy="0" r="3" fill="#3A7BC9"/>
            </svg>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator fade-in-6">
            <div className="scroll-line" />
            <span>scroll</span>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-bar">
          {stats.map(({ num, label, dot }, i) => (
            <RevealSection key={label} className="stat" delay={i * 80}>
              <div className="stat-num">
                {dot && <span className="status-dot" />}
                <AnimatedCounter value={num} />
              </div>
              <div className="stat-label">{label}</div>
            </RevealSection>
          ))}
        </div>

        {/* ── ABOUT ── */}
        <section id="about" className="section-about">
          <RevealSection className="about-text-col" direction="left">
            <div className="section-label">{t("about-label")}</div>
            <h2 className="section-title">{t("about-title")}</h2>
            <p>{t("about-text")}</p>
            <div className="terminal-card">
              <div className="terminal-bar">
                <span /><span /><span />
                <p>profile.sh</p>
              </div>
              <div className="terminal-body">
                <p><span className="tc-green">$</span> <span className="tc-gold">cat</span> profile.json</p>
                <p><span className="tc-muted">{"{"}</span></p>
                <p>&nbsp;&nbsp;<span className="tc-blue">"age"</span>: <span className="tc-gold">19</span>,</p>
                <p>&nbsp;&nbsp;<span className="tc-blue">"location"</span>: <span className="tc-green">"Recife, BR"</span>,</p>
                <p>&nbsp;&nbsp;<span className="tc-blue">"role"</span>: <span className="tc-green">"{t("profession")}"</span>,</p>
                <p>&nbsp;&nbsp;<span className="tc-blue">"status"</span>: <span className="tc-green">"open_to_work"</span></p>
                <p><span className="tc-muted">{"}"}</span></p>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={150} className="about-img-col" direction="right">
            <Image src="/images/fernando.png" alt="Fernando Machado"
              width={500} height={500} className="foto-fernando" priority />
          </RevealSection>
        </section>

        {/* ── PROJECTS CAROUSEL ── */}
        <section id="projects" className="section-projects">
          <RevealSection>
            <div className="projects-header">
              <div>
                <div className="section-label">{t("projects-label")}</div>
                <h2 className="section-title">{t("projects-heading")}</h2>
              </div>
              <div className="carousel-controls">
                <span className="carousel-counter">
                  {String(carouselIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
                <button className="carousel-btn" onClick={() => navigate(-1)} disabled={carouselIndex === 0} aria-label="Anterior">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button className="carousel-btn" onClick={() => navigate(1)} disabled={carouselIndex >= maxIndex} aria-label="Próximo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </RevealSection>

          <div className="carousel-viewport">
            <div className="carousel-track"
              style={{ transform: `translateX(calc(-${carouselIndex * 50}% - ${carouselIndex * 1}px))`,
                transition: isTransitioning ? "transform 0.55s cubic-bezier(.16,1,.3,1)" : "none" }}>
              {projects.map(({ num, titleKey, textKey, img, tags, soon }, i) => (
                <div key={i} className={`project-card ${soon ? "project-card--soon" : ""}`}>
                  {soon ? (
                    <div className="soon-inner">
                      <div className="soon-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                      </div>
                      <div className="project-num">{num}</div>
                      <h3>{t("project-soon-title")}</h3>
                      <p>{t("project-soon-text")}</p>
                    </div>
                  ) : (
                    <>
                      <div className="project-num">{num} / {t(titleKey)}</div>
                      <h3>{t(titleKey)}</h3>
                      <p>{t(textKey)}</p>
                      <div className="skill-tags">
                        {tags.map((tag, j) => (
                          <span key={tag} className={`tag ${j === 0 ? "gold" : ""}`}>{tag}</span>
                        ))}
                      </div>
                      <div className="project-img-wrap">
                        <Image src={img} alt={t(titleKey)} width={600} height={240} className="projeto-img" />
                        <div className="project-img-overlay" />
                      </div>
                    </>
                  )}
                  {/* Corner decoration */}
                  <div className="corner-tl" /><div className="corner-tr" />
                  <div className="corner-bl" /><div className="corner-br" />
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} className={`carousel-dot ${carouselIndex === i ? "active" : ""}`}
                onClick={() => { if (!isTransitioning) { setIsTransitioning(true); setCarouselIndex(i); setTimeout(() => setIsTransitioning(false), 500); } }}
                aria-label={`Projeto ${i + 1}`} />
            ))}
          </div>
        </section>

        <section id="contact" className="section-contact">
          <RevealSection>
            <div className="section-label">{t("contact-label")}</div>
            <h2 className="cta-title" dangerouslySetInnerHTML={{ __html: t("contact-title") }} />
            <p className="cta-sub">{t("contact-sub")}</p>
            <a href="https://instagram.com/fernandomneto_" target="_blank" rel="noopener noreferrer">
              <button className="btn-primary">{t("contact-cta")}</button>
            </a>
          </RevealSection>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <RevealSection className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-accent">FMN</span>
              <span className="footer-logo-sep">/</span>
              Fernando Machado Neto
            </div>
            <p className="footer-tagline">{t("footer-tagline")}</p>
            <div className="footer-social">
              <a href="https://instagram.com/fernandomneto_" target="_blank" rel="noopener noreferrer"
                className="footer-social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
                @fernandomneto_
              </a>
            </div>
          </RevealSection>

          <RevealSection delay={100} className="footer-nav-col">
            <h4 className="footer-col-title">{t("footer-nav-title")}</h4>
            <ul className="footer-nav-list">
              {[
                { id: "home",     label: t("menu-home") },
                { id: "about",    label: t("menu-about") },
                { id: "projects", label: t("menu-projects") },
                { id: "contact",  label: t("menu-contact") },
              ].map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="footer-nav-link">{label}</button>
                </li>
              ))}
            </ul>
          </RevealSection>

          <RevealSection delay={200} className="footer-nav-col">
            <h4 className="footer-col-title">{t("footer-skills-title")}</h4>
            <ul className="footer-nav-list">
              {(t("footer-skills-list") as string).split("|").map((s: string) => (
                <li key={s} className="footer-skill-item">{s.trim()}</li>
              ))}
            </ul>
          </RevealSection>

          <RevealSection delay={300} className="footer-cta-col">
            <h4 className="footer-col-title">{t("footer-cta-title")}</h4>
            <p className="footer-cta-text">{t("footer-cta-text")}</p>
            <a href="https://instagram.com/fernandomneto_" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", marginTop: "20px" }}>
              <button className="btn-primary" style={{ width: "100%" }}>{t("footer-cta-btn")}</button>
            </a>
            <div className="footer-langs">
              {flags.map(({ lang, src, alt }) => (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`flag-btn ${language === lang ? "active" : ""}`} aria-label={alt}>
                  <Image src={src} alt={alt} width={28} height={28} className="flag" />
                </button>
              ))}
            </div>
          </RevealSection>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Fernando Machado Neto</span>
          <span className="footer-divider">·</span>
          <span>{t("footer-role")}</span>
          <span className="footer-divider">·</span>
          <span>🇧🇷 Recife, BR</span>
        </div>
      </footer>
    </>
  );
}