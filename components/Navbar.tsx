"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translation";

const flags: { lang: Language; src: string; alt: string }[] = [
  { lang: "pt", src: "/images/brasil.png", alt: "Brasil" },
  { lang: "en", src: "/images/usa.png", alt: "USA" },
  { lang: "fr", src: "/images/franca.png", alt: "França" },
];

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="header">
      <div className="language-selector">
        {flags.map(({ lang, src, alt }) => (
          <button key={lang} onClick={() => setLanguage(lang)} className={`flag-btn ${language === lang ? "active" : ""}`} aria-label={alt}>
            <Image src={src} alt={alt} width={40} height={40} className="flag" />
          </button>
        ))}
      </div>
      <nav className="navegacao">
        <Link href="/">{t("menu-home")}</Link>
        <Link href="/about">{t("menu-about")}</Link>
        <Link href="/projects">{t("menu-projects")}</Link>
        <a href="https://instagram.com/fernandomneto_" target="_blank" rel="noopener noreferrer" className="contato-link">
          <button>{t("menu-contact")}</button>
        </a>
      </nav>
    </header>
  );
}