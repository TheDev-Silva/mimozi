import {
  LucideHeart,
  ChevronLeft,
  ChevronRight,
  LucideStars,
  LucideLibraryBig,
  LucideBookOpenCheck,
  LucideUploadCloud,
  LucideStar,
  LucideBadgeCheck,
  LucideTag,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PromoBanner } from "./PromoBanner";

// Lista de imagens para o carrossel em pilha
const heroImages = [
  {
    id: 1,
    url: "/banners/mimozi-1.jpeg",
    caption: "Mimozi Foto-ímã Redondo",
  },
  {
    id: 2,
    url: "/banners/mimozi-2.jpeg",
    caption: "Memórias em Polaroid",
  },
  {
    id: 3,
    url: "/banners/mimozi-3.jpeg",
    caption: "Detalhes com carinho",
  },
];

export function Hero() {
  // Estado para controlar a imagem ativa no carrossel de pilha
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [randomOffset, setRandomOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Gera variações sutis aleatórias a cada carregamento da página
    setRandomOffset({
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 20) - 10,
    });
  }, []);

  // Funções para alternar as fotos na pilha
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col w-full min-h-screen items-center justify-between pt-24 md:pt-22  overflow-hidden font-fredoka"
    >
      <div className="w-full pt-20">
        <PromoBanner />
      </div>

      <div className="relative flex w-full max-w-8xl pt-10 flex-col items-center justify-between gap-12 md:flex-row bg-primary/5 px-16">
        {/* Lado Esquerdo: Textos, Títulos e Status */}
        <div className="flex w-full flex-col justify-center gap-6 top-0 md:w-1/2 pr-0">
          <h3 className="text-[#870D43] gap-2 flex bg-primary/10 px-4 py-2 rounded-full text-sm w-fit items-center font-medium">
            <LucideHeart size={20} className="text-[#870D43]" />
            Pequenos detalhes, grandes momentos!
          </h3>

          <h1 className="text-3xl md:text-[54px] font-fredoka">
            Vem aí uma nova forma
            <div className="flex gap-2 w-full">
              <h1>de </h1>
              <h1 className="text-primary">eternizar</h1>
              <h1>suas</h1>
            </div>
            memórias com carinho!
          </h1>

          <h3 className="text-base text-gray-400 leading-relaxed">
            Transforme seus momentos esquecidos no celular em lembranças físicas
            cheias de afeto para sua geladeira, mural ou bolsa. Acabamento
            artesanal, verniz protetor e imã de alta fixação.
          </h3>
          <div className="flex flex-row justify-between items-center">
            <Link
              href={"/ideia"}
              className="flex w-60 px-4 bg-primary text-white py-3 rounded-full font-medium hover:bg-primary/80 transition-colors duration-200 items-center justify-center gap"
            >
              <LucideUploadCloud size={20} className="mr-2" />
              <span className="text-xs md:text-sm">Mandar Idéia detalhada</span>
            </Link>
            <Link
              href="/personalizer"
              className="flex w-fit items-center gap-2 text-primary/70 transition-colors duration-200 hover:text-primary"
            >
              <LucideBookOpenCheck /> Explore moldes prontos!
            </Link>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="flex w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 items-center justify-center">
                <LucideBadgeCheck color="#E11570" />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-fredoka ">100% Exclusivo</h1>
                <span className="text-xs text-gray-500">
                  Seu Toque Especial
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex w-10 h-10 rounded-sm bg-secondary/40 border border-secondary items-center justify-center">
                <LucideTag className="text-secondary" />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-fredoka ">100% Exclusivo</h1>
                <span className="text-xs text-gray-500">
                  Seu Toque Especial
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex w-10 h-10 rounded-sm bg-primary/10 border border-primary/20 items-center justify-center">
                <LucideBadgeCheck color="#E11570" />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="font-fredoka ">100% Exclusivo</h1>
                <span className="text-xs text-gray-500">
                  Seu Toque Especial
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Carrossel em Pilha de Imagens (Uma em cima da outra) */}
        <div className="flex w-full flex-col items-end justify-end gap-6 top-0 md:w-1/2 pr-0 ">
          <div
            className="relative w-80 h-96 md:w-120 md:h-120 cursor-pointer group"
            onClick={nextImage}
            title="Clique para ver a próxima foto"
          >
            {/* Renderiza a pilha de imagens */}
            {heroImages.map((img, index) => {
              // Calcula a posição relativa na pilha para criar efeito visual de profundidade
              const isCurrent = index === currentImageIndex;
              const isPrevious =
                index ===
                (currentImageIndex - 1 + heroImages.length) % heroImages.length;

              let styleClasses =
                "opacity-0 pointer-events-none scale-95 translate-y-4 rotate-2";

              if (isCurrent) {
                styleClasses =
                  "opacity-100 z-20 scale-100 translate-y-0 rotate-0 shadow-xl";
              } else if (isPrevious) {
                styleClasses =
                  "opacity-70 z-10 scale-95 -translate-x-4 translate-y-2 -rotate-6 shadow-md";
              }

              return (
                <div
                  key={img.id}
                  className={`absolute inset-0 bg-secondary p-4 pb-12 rounded-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-between ${styleClasses}`}
                >
                  <div className="w-full h-[82%] overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-contain rounded-lg transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full pt-3 text-center">
                    <p className="font-fredoka text-gray-700 text-sm tracking-wide">
                      {img.caption}
                    </p>
                    {/* <span className="text-[10px] text-white font-sans">
                      (Clique na foto para alternar)
                    </span> */}
                  </div>
                </div>
              );
            })}

            {/* Botões de navegação laterais discretos */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md border border-primary/20 transition-all hover:scale-110"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md border border-primary/20 transition-all hover:scale-110"
              aria-label="Próxima foto"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
