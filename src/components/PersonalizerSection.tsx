import React, { useState } from "react";
import {
  LucideUploadCloud,
  Check,
  Trash2,
  Sliders,
  Sparkles,
} from "lucide-react";

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

export function PersonalizerSection() {
  const [shape, setShape] = useState<"redondo" | "quadrado">("redondo");
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [quantity, setQuantity] = useState<number>(100);

  // Simula o upload e conversão das imagens para preview instantâneo
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    const newPhotos: UploadedPhoto[] = filesArray.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // Cálculo de desconto progressivo básico por quantidade
  const getUnitPrice = (qty: number) => {
    if (qty >= 500) return 2.5;
    if (qty >= 300) return 2.8;
    if (qty >= 200) return 3.1;
    return 3.5; // 100 unidades
  };

  const unitPrice = getUnitPrice(quantity);
  const totalPrice = (quantity * unitPrice).toFixed(2);

  return (
    <section id="brief" className="w-full py-16 px-4 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-primary/20">
        {/* Título da Seção */}
        <div className="text-center mb-10">
          <span className="text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
            <Sparkles size={14} /> Personalizador Instantâneo Mimozi
          </span>
          <h2 className="text-2xl md:text-4xl font-fredoka text-gray-800">
            Monte seus Foto-Ímãs de 5cm
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Escolha o formato, envie suas fotos e veja o resultado na hora
            dentro do nosso molde exclusivo!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coluna Esquerda: Controles e Upload */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* 1. Escolha do Formato */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                1. Escolha o Formato (5cm - Foto-ímã)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShape("redondo")}
                  className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    shape === "redondo"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 border-current" />
                  Redondo 5cm
                </button>
                <button
                  type="button"
                  onClick={() => setShape("quadrado")}
                  className={`py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    shape === "quadrado"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-sm border-2 border-current" />
                  Quadrado 5cm
                </button>
              </div>
            </div>

            {/* 2. Quantidade e Desconto Progressivo */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                2. Quantidade de Peças (Desconto Progressivo)
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary shadow-sm"
              >
                <option value={100}>100 unidades (R$ 3,50 un.)</option>
                <option value={200}>200 unidades (R$ 3,10 un.)</option>
                <option value={300}>
                  300 unidades - Mais Popular! (R$ 2,80 un.)
                </option>
                <option value={400}>400 unidades (R$ 2,50 un.)</option>
                <option value={500}>500 unidades (R$ 2,50 un.)</option>
                <option value={1000}>
                  1000 unidades - Super Atacado (R$ 2,20 un.)
                </option>
              </select>
            </div>

            {/* 3. Botão de Upload de Arquivos */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                3. Envie suas Fotos
              </label>
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/40 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors p-4 text-center">
                <LucideUploadCloud size={32} className="text-primary mb-2" />
                <span className="text-xs font-medium text-gray-700">
                  Clique aqui para enviar suas fotos
                </span>
                <span className="text-[10px] text-gray-400 mt-1">
                  Suporta JPG, PNG (várias imagens de uma vez)
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Resumo de Preço */}
            <div className="bg-secondary/20 rounded-2xl p-4 border border-secondary/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500 block">
                  Total Estimado
                </span>
                <span className="text-xl font-fredoka text-primary">
                  R$ {totalPrice}
                </span>
              </div>
              <button
                type="button"
                className="flex px-6 bg-primary text-white py-3 rounded-full font-medium hover:bg-primary/80 transition-colors duration-200 items-center justify-center gap-2 shadow-md text-sm"
              >
                <Check size={18} />
                Finalizar Pedido
              </button>
            </div>
          </div>

          {/* Coluna Direita: Simulador Instantâneo (Preview com o Moldes) */}
          <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col min-h-105">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-600">
                Simulador ao Vivo ({photos.length} foto
                {photos.length !== 1 ? "s" : ""} adicionada
                {photos.length !== 1 ? "s" : ""})
              </h3>
              <span className="text-xs text-primary font-medium">
                Molde Mimozi Ativo
              </span>
            </div>

            {photos.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400">
                <Sliders size={40} className="mb-2 opacity-40 text-primary" />
                <p className="text-sm font-medium text-gray-600">
                  Nenhuma foto enviada ainda.
                </p>
                <p className="text-xs mt-1">
                  Suas imagens aparecerão aqui automaticamente encaixadas no
                  molde do ímã!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-100 overflow-y-auto pr-2">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group bg-white p-3 shadow-sm rounded-xl border border-gray-200 flex flex-col items-center animate-fade-in"
                  >
                    {/* Botão para remover foto individual */}
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      title="Remover foto"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Moldura simulada do button/foto-ímã */}
                    <div className="w-28 h-28 relative flex items-center justify-center bg-gray-100 shadow-inner overflow-hidden p-1 border-4 border-primary/30">
                      <img
                        src={photo.url}
                        alt="Preview"
                        className={`w-full h-full object-cover shadow-sm ${
                          shape === "redondo" ? "rounded-full" : "rounded-md"
                        }`}
                      />
                    </div>

                    <span className="text-[10px] text-gray-500 mt-2 truncate w-full text-center">
                      {photo.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
