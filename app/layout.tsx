import type { Metadata } from "next";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernando Machado · Engenharia de Complexidade",
  description: "Portfólio de Fernando Machado Neto — Automação e Sistemas Complexos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}