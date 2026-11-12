"use client";

import React, { useState } from "react";
import {
  Sparkles,
  LucideUploadCloud,
  Wand2,
  ArrowLeft,
  Check,
  RotateCcw,
  ShoppingBag,
  Palette,
} from "lucide-react";
import Link from "next/link";

// Temas Principais da Mimozi
const MAIN_THEMES = [
  {
    id: "natal",
    name: "Natal & Fim de Ano",
    icon: "🎄",
    overlayColor: "from-red-500/20 to-emerald-500/20",
    badge: "Natal Mimozi",
    decorText: "✨ Feliz Natal ✨",
  },
  {
    id: "carnaval",
    name: "Carnaval & Festa",
    icon: "🎭",
    overlayColor: "from-yellow-400/20 via-pink-500/20 to-purple-500/20",
    badge: "Folia",
    decorText: "🎉 Alegria & Folia 🎉",
  },
  {
    id: "calendario",
    name: "Calendário 2027",
    icon: "📅",
    overlayColor: "from-blue-400/15 to-indigo-500/15",
    badge: "2027",
    decorText: "🗓️ Mês Especial 2027",
  },
  {
    id: "amor",
    name: "Amor & Família",
    icon: "💖",
    overlayColor: "from-pink-400/20 to-rose-300/20",
    badge: "Com Amor",
    decorText: "💖 Pequenas Memórias 💖",
  },
];

// Sub-estilos de Acabamento Visual
const SUB_STYLES = [
  {
    id: "simples",
    name: "Simples & Clean",
    borderClass: "border-white shadow-md",
    filterClass: "",
  },
  {
    id: "moderado",
    name: "Moderado / Decorado",
    borderClass: "border-primary/40 shadow-lg ring-4 ring-primary/10",
    filterClass: "contrast-105 brightness-105",
  },
  {
    id: "rustico",
    name: "Rústico / Artesanal",
    borderClass: "border-amber-700/50 bg-amber-50 shadow-md",
    filterClass: "sepia-[0.25] warm-filter",
  },
];

export default function PersonalizerIAPage() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("natal");
  const [selectedStyle, setSelectedStyle] = useState<string>("moderado");
  const [shape, setShape] = useState<"redondo" | "quadrado">("redondo");
  const [quantity, setQuantity] = useState<number>(10);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isCheckoutStep, setIsCheckoutStep] = useState<boolean>(false);

  // Manipula o upload da imagem original do usuário
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl(objectUrl);
    setIsRendered(false); // Exige acionar a geração para aplicar a moldura
  };

  // Aplica o efeito do tema sobre a foto original enviada
  const applyThemeToPhoto = () => {
    if (!photoUrl) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsRendered(true);
    }, 1200);
  };

  // Cálculo de Preço
  const unitPrice = quantity >= 100 ? 3.0 : quantity >= 50 ? 3.5 : 4.0;
  const totalPrice = (quantity * unitPrice).toFixed(2);

  const activeThemeObj =
    MAIN_THEMES.find((t) => t.id === selectedTheme) || MAIN_THEMES[0];
  const activeStyleObj =
    SUB_STYLES.find((s) => s.id === selectedStyle) || SUB_STYLES[0];

  return (
    <main className="min-h-screen bg-background py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Topo / Voltar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/personalizer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
          >
            <ArrowLeft size={16} /> Voltar para o Studio Tradicional
          </Link>
          <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1.5 rounded-full">
            Simulador de Temas Mimozi[cite: 2]
          </span>
        </div>

        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-primary/20">
          <div className="text-center mb-8">
            <span className="text-primary bg-primary/10 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
              <Sparkles size={14} /> Personalização por Temas
            </span>
            <h1 className="text-2xl md:text-4xl font-fredoka text-gray-800">
              Veja Sua Foto Aplicada nos Temas Mimozi
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Envie sua foto e escolha o tema. O sistema encaixa a imagem
              original perfeitamente no foto-ímã!
            </p>
          </div>

          {!isCheckoutStep ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CONTROLES E SELEÇÃO (Esquerda) */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* 1. Upload da Foto Original */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    1. Sua Foto Original
                  </label>
                  <label className="cursor-pointer flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-primary/40 rounded-2xl bg-primary/5 hover:bg-primary/10 transition-colors p-3 text-center">
                    <LucideUploadCloud
                      size={26}
                      className="text-primary mb-1"
                    />
                    <span className="text-xs font-medium text-gray-700">
                      {photoUrl
                        ? "Foto enviada! Clique para trocar"
                        : "Escolha uma foto do seu dispositivo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* 2. Escolha do Tema */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    2. Escolha o Tema
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {MAIN_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          setSelectedTheme(theme.id);
                          setIsRendered(false);
                        }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                          selectedTheme === theme.id
                            ? "border-primary bg-primary/10 text-primary font-bold shadow-sm"
                            : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-base">{theme.icon}</span>
                        <span className="truncate">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Escolha do Acabamento */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    3. Estilo de Acabamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {SUB_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => {
                          setSelectedStyle(style.id);
                          setIsRendered(false);
                        }}
                        className={`p-2 rounded-xl border text-center text-xs transition-all cursor-pointer ${
                          selectedStyle === style.id
                            ? "border-primary bg-primary/10 text-primary font-bold"
                            : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {style.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Formato e Quantidade */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-700 block mb-1">
                      Formato:
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setShape("redondo")}
                        className={`px-2.5 py-1 rounded-lg ${shape === "redondo" ? "bg-primary text-white font-bold" : "bg-white border"}`}
                      >
                        Redondo
                      </button>
                      <button
                        onClick={() => setShape("quadrado")}
                        className={`px-2.5 py-1 rounded-lg ${shape === "quadrado" ? "bg-primary text-white font-bold" : "bg-white border"}`}
                      >
                        Quadrado
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-gray-700 block mb-1">
                      Mínimo 10 un:
                    </span>
                    <input
                      type="number"
                      min={10}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(10, Number(e.target.value)))
                      }
                      className="w-16 text-center font-bold bg-white border rounded-lg py-1 text-xs"
                    />
                  </div>
                </div>

                {/* Botão de Processar */}
                <button
                  type="button"
                  disabled={!photoUrl || isProcessing}
                  onClick={applyThemeToPhoto}
                  className={`w-full py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                    !photoUrl
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/80 cursor-pointer"
                  }`}
                >
                  <Wand2
                    size={18}
                    className={isProcessing ? "animate-spin" : ""}
                  />
                  {isProcessing
                    ? "Aplicando tema na sua foto..."
                    : "Aplicar Tema na Foto"}
                </button>
              </div>

              {/* SIMULADOR COM A FOTO ORIGINAL DO CLIENTE (Direita) */}
              <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col min-h- items-center justify-center">
                <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-600 flex items-center gap-1.5">
                    <Palette size={14} className="text-primary" />
                    Preview Real da Sua Foto
                  </span>
                  {isRendered && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                      Resultado Pronto
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  {!photoUrl ? (
                    <div className="text-center text-gray-400 space-y-2 p-8">
                      <LucideUploadCloud
                        size={40}
                        className="mx-auto opacity-30 text-primary"
                      />
                      <p className="text-sm font-medium text-gray-600">
                        Envie sua foto para ver a mágica
                      </p>
                      <p className="text-xs">
                        Sua imagem aparecerá aqui ajustada no modelo real do
                        ímã!
                      </p>
                    </div>
                  ) : isProcessing ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-xs font-bold text-gray-700 animate-pulse">
                        Ajustando a foto ao tema {activeThemeObj.name}...
                      </p>
                    </div>
                  ) : isRendered ? (
                    <div className="flex flex-col items-center gap-5 animate-fade-in">
                      {/* MOLDURA MOCKUP COM A FOTO REAL DO CLIENTE */}
                      <div
                        className={`w-64 h-64 relative p-3 bg-white ${activeStyleObj.borderClass} ${
                          shape === "redondo" ? "rounded-full" : "rounded-3xl"
                        } flex flex-col items-center justify-between overflow-hidden shadow-2xl transition-all duration-300`}
                      >
                        {/* Imagem Original do Cliente */}
                        <div
                          className={`w-full h-full relative overflow-hidden ${
                            shape === "redondo" ? "rounded-full" : "rounded-2xl"
                          }`}
                        >
                          <img
                            src={photoUrl}
                            alt="Foto do Cliente"
                            className={`w-full h-full object-cover ${activeStyleObj.filterClass}`}
                          />

                          {/* Camada temática translúcida sobre a imagem */}
                          <div
                            className={`absolute inset-0 bg-linear-to-b ${activeThemeObj.overlayColor} pointer-events-none`}
                          />

                          {/* Decoração/Rótulo do Tema no Rodapé do Button */}
                          <div className="absolute bottom-2 inset-x-0 text-center px-2">
                            <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold font-fredoka px-3 py-1 rounded-full shadow-sm inline-block">
                              {activeThemeObj.decorText}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Resumo da Compra */}
                      <div className="bg-white p-4 rounded-2xl border border-gray-200 w-full max-w-sm flex items-center justify-between shadow-sm">
                        <div>
                          <span className="text-[10px] text-gray-400 block uppercase">
                            Total ({quantity} un.)
                          </span>
                          <span className="text-lg font-fredoka text-primary">
                            R$ {totalPrice}
                          </span>
                        </div>
                        <button
                          onClick={() => setIsCheckoutStep(true)}
                          className="bg-primary text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-primary/80 transition-colors flex items-center gap-1.5 shadow"
                        >
                          <Check size={16} /> Gostei! Encomendar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 space-y-3 p-6">
                      <div
                        className={`w-66 h-66 ${shape === "redondo" ? "rounded-full" : "rounded-lg"} overflow-hidden mx-auto border-2 border-primary/40 shadow-inner`}
                      >
                        <img
                          src={photoUrl}
                          alt="Original"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium">
                        Foto carregada com sucesso!
                      </p>
                      <p className="text-[11px] text-gray-400">
                        Clique no botão &quot;Aplicar Tema na Foto&quot; ao lado
                        para ver o preview final.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Checkout */
            <div className="max-w-xl mx-auto space-y-5">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm space-y-3">
                <h3 className="font-bold text-gray-800 font-fredoka flex items-center gap-2 border-b pb-2">
                  <ShoppingBag size={18} className="text-primary" /> Resumo da
                  Encomenda
                </h3>
                <div className="flex justify-between text-gray-600">
                  <span>Tema Selecionado:</span>
                  <strong className="capitalize">{activeThemeObj.name}</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Acabamento:</span>
                  <strong className="capitalize">{activeStyleObj.name}</strong>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Formato & Quantidade:</span>
                  <strong className="capitalize">
                    {shape} (5cm) — {quantity} un.
                  </strong>
                </div>
                <div className="flex justify-between text-base pt-2 text-primary font-bold border-t">
                  <span>Valor Total:</span>
                  <span>R$ {totalPrice}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsCheckoutStep(false)}
                  className="w-1/2 py-3 rounded-full border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-50"
                >
                  Voltar e Ajustar
                </button>
                <button
                  onClick={() =>
                    alert("Pedido com foto real e tema enviado com sucesso!")
                  }
                  className="w-1/2 py-3 rounded-full bg-primary text-white font-medium text-xs hover:bg-primary/80 transition-colors shadow-md"
                >
                  Confirmar e Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
