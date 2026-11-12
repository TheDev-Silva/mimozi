"use client";

import { Header } from "../components/layout/Header";
import HeaderList from "../components/HeaderList";
import { Hero } from "../components/Hero";
import { useEffect, useRef, useState } from "react";
import { Catalog } from "../components/Catalog";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const catalogoRef = useRef<HTMLDivElement>(null);
  const etiquetaRef = useRef<HTMLDivElement>(null);
  const depoimentosRef = useRef<HTMLDivElement>(null);

  const secaoRef = useRef<HTMLDivElement>(null);
  const [isFixo, setIsFixo] = useState(false);

  // 🚀 FORÇA O SCROLL PARA O TOPO ABSOLUTO AO CARREGAR A PÁGINA
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Garante que vá direto sem animação travada
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!secaoRef.current) return;
      const topoDaSecao = secaoRef.current.getBoundingClientRect().top;
      setIsFixo(topoDaSecao <= 0); // Ajustado para sua lógica
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header />
      <HeaderList />

      <main>
        {/* Seção Hero principal */}
        <div ref={heroRef}>
          <Hero />
        </div>

        <div ref={secaoRef}></div>

        {/* Seção do Catálogo */}
        <div ref={catalogoRef}>
          <Catalog />
        </div>

        <div ref={aboutRef} id="about" />
        <div ref={etiquetaRef} id="etiqueta" />
        <div ref={depoimentosRef} id="depoimentos" />
      </main>
    </>
  );
}
