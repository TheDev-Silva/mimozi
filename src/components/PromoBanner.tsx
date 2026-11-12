"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { PROMOCOES_REAIS } from "../data/promo";
import Link from "next/link";

export function PromoBanner() {
  const [promosAtivas] = useState(PROMOCOES_REAIS.filter((p) => p.ativo));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (promosAtivas.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promosAtivas.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [promosAtivas.length]);

  if (!isVisible || promosAtivas.length === 0) return null;

  const promoAtual = promosAtivas[currentIndex];

  return (
    <div className="w-full max-8xl mx-auto px-18 pt-4 pb-2 font-fredoka">
      <div
        className={`relative w-full rounded-3xl bg-linear-to-r ${promoAtual.bgGradient} text-white shadow-xl overflow-hidden transition-all duration-700 border border-white/20`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 items-center p-6 md:p-6 gap-6">
          {/* LADO ESQUERDO: TEXTOS, OFERTAS E BOTÃO */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start space-y-3 z-10">
            {/* Selo/Tag da Oferta */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${promoAtual.badgeCor}`}
            >
              <Sparkles size={14} /> {promoAtual.tag}
            </span>

            {/* Títulos */}
            <div>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                {promoAtual.titulo}
              </h2>
              <p className="text-sm md:text-lg text-white/95 font-medium mt-1">
                {promoAtual.subtitulo}
              </p>
            </div>

            {/* Detalhes do Pacote */}
            <p className="text-xs md:text-sm text-white/80 bg-black/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              {promoAtual.detalhes}
            </p>

            {/* BOTÃO DE AÇÃO COM PARÂMETROS DE URL */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href={promoAtual.targetUrl}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-xs md:text-sm hover:bg-gray-100 hover:scale-105 transition-all shadow-lg cursor-pointer"
              >
                {promoAtual.linkTexto} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* LADO DIREITO: FOTO DO PRODUCT / BANNER */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center items-center relative">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30 transform md:rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src={promoAtual.imagem}
                alt={promoAtual.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback visual limpo se a foto não for encontrada
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* CONTROLES DO CARROSSEL (PONTOS E FECHAR) */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
          {/* Indicadores de Slide */}
          {promosAtivas.length > 1 && (
            <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
              {promosAtivas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? "bg-white w-5" : "bg-white/40 w-2"
                  }`}
                  aria-label={`Ir para banner ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Botão Fechar */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1.5 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full transition-colors cursor-pointer"
            title="Fechar banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
