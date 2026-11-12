"use client";

import Image from "next/image";
import { useEffect } from "react";

interface ImageZoomProps {
  imagem: {
    image?: string; // Garante compatibilidade caso a chave do seu objeto seja .image
    src?: string; // Garante compatibilidade caso a chave seja .src
    title: string;
    format: string;
    indiceInicial?: void;
  };
  onClose: () => void;
}

export default function ImageZoom({ imagem, onClose }: ImageZoomProps) {
  // Descobre qual chave de imagem está preenchida e garante que não seja uma string vazia
  const urlImagem = imagem.image || imagem.src;

  // Bloqueia o scroll da página ao abrir
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // SE NÃO HOUVER UMA URL VÁLIDA, NÃO RENDERIZA O MODAL (Corrige o erro do console)
  if (!urlImagem || urlImagem.trim() === "") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 md:p-10 animate-fade-in"
      onClick={onClose}
    >
      {/* Botão de Fechar */}
      <button
        className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl font-light hover:bg-white/20 active:scale-95 transition-all"
        onClick={onClose}
      >
        &times;
      </button>
      {/* Container da Imagem */}
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={urlImagem} // Usa a URL tratada e validada
          alt={imagem.title || "Zoom da imagem"}
          fill
          priority
          className="object-contain"
          sizes="100vw"
        />
      </div>
    </div>
  );
}
