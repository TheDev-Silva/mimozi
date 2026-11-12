"use client";

import { useState } from "react";

interface GaleriaProps {
  imagemInicial: string;
  imagensArray: string[];
  titulo: string;
}

export default function GaleriaProdutoInteractive({
  imagemInicial,
  imagensArray,
  titulo,
}: GaleriaProps) {
  const [imagemFoco, setImagemFoco] = useState(imagemInicial);

  return (
    <div className="flex flex-row justify-center items-center gap-6 w-full">
      {/* Coluna de Miniaturas da Esquerda */}
      <div className="flex flex-col justify-center gap-4">
        {imagensArray.map((imgUrl, index) => (
          <button
            key={index}
            onClick={() => setImagemFoco(imgUrl)}
            className={`w-24 h-24 bg-white p-2 shadow-sm border rounded-2xl flex justify-center items-center transition-all cursor-pointer ${
              imagemFoco === imgUrl
                ? "border-pink-500 scale-105 shadow-md"
                : "border-rose-100 hover:border-gray-400"
            }`}
          >
            <img
              src={imgUrl}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Imagem Principal da Direita */}
      <div className="w-115 h-115 bg-white rounded-3xl shadow-sm border border-rose-100 flex items-center justify-center overflow-hidden p-4">
        <img
          src={imagemFoco}
          alt={titulo}
          className="w-full h-full object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
}
