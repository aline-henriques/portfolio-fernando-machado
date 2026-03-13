"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid-bg" />
      <Navbar />
      <main>
        <div className="sobre">
          <div className="texto">
            <div className="section-label">Sobre mim</div>
            <h2>{t("about-title")}</h2>
            <p>{t("about-text")}</p>
          </div>
          <Image
            src="/images/fernando.png"
            alt="Foto de Fernando"
            width={500}
            height={500}
            className="foto-fernando"
            priority
          />
        </div>
      </main>
    </>
  );
}