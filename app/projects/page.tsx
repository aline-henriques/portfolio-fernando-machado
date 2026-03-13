"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  {
    num: "001 / DRONE",
    titleKey: "project-drone-title",
    textKey: "project-drone-text",
    image: "/images/drone.jpg",
    alt: "Drone Project",
    tags: ["Controle PID", "Sensores", "Python"],
  },
  {
    num: "002 / BARCO",
    titleKey: "project-boat-title",
    textKey: "project-boat-text",
    image: "/images/boat.jpg",
    alt: "Boat Project",
    tags: ["IoT", "Arduino", "LoRa"],
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <>
      <div className="grid-bg" />
      <Navbar />
      <main>
        <div className="projects-title">
          <div className="section-label">{t("projects-title")}</div>
          <h1>Projetos em destaque</h1>
        </div>
        <div className="projetos-grid">
          {projects.map((p) => (
            <div className="projetos" key={p.titleKey}>
              <div className="project-num">{p.num}</div>
              <h2>{t(p.titleKey)}</h2>
              <p>{t(p.textKey)}</p>
              <div className="skill-tags">
                {p.tags.map((tag, i) => (
                  <span key={tag} className={`tag ${i === 0 ? "gold" : ""}`}>{tag}</span>
                ))}
              </div>
              <Image src={p.image} alt={p.alt} width={600} height={200} className="projeto-img" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}