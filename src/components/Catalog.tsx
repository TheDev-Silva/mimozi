"use client";

import { useMemo, useState } from "react";
import {
  LucideSearch,
  LucideStars,
  LucidePercent,
  LucideFlame,
  LucidePencilSparkles,
  LucideZoomIn,
} from "lucide-react";
import {
  BOTTON_MODELS,
  CATEGORIES,
  FORMATS,
  menuDescont,
} from "../data/buttons";
import ImageZoom from "./ImageZoom";
import Link from "next/link";

interface ImagemItem {
  id: number;
  src: string;
  alt: string;
  format: string;
}

export function Catalog() {
  const [activeDiscountId, setActiveDiscountId] = useState(menuDescont[0]?.id);
  const [imagemAtiva, setImagemAtiva] = useState<ImagemItem | null>(null);
  // Estados de Filtro e Busca
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedFormat, setSelectedFormat] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtragem combinada por Categoria, Formato e Busca por texto
  const filteredModels = useMemo(() => {
    return BOTTON_MODELS.filter((item) => {
      const matchCategory =
        selectedCategory === "todos" || item.theme === selectedCategory;
      const matchFormat =
        selectedFormat === "todos" || item.format === selectedFormat;
      const matchSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subtitle &&
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchFormat && matchSearch;
    });
  }, [selectedCategory, selectedFormat, searchQuery]);

  const renderFormat = (status: string) => {
    switch (status) {
      case "quadrado":
        return "Quadrado 5cm";
      case "redondo":
        return "Redondo 5cm";
      case "conjunto":
        return "Conjunto Quadrado e Redondo";
    }
  };

  return (
    <section
      id="catalogo"
      className="relative flex flex-col w-full overflow-hidden font-fredoka"
    >
      <div className="relative mx-auto w-full max-w-8xl px-6 md:px-16 pt-10 bg-secondary/5 space-y-8">
        {/* Cabeçalho de Textos */}
        <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-6">
          <div className="flex w-full flex-col justify-center gap-4 lg:w-3/5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#870D43] gap-2 flex bg-primary/10 px-4 py-2 rounded-full text-xs md:text-sm items-center font-medium">
                <LucideStars size={18} className="text-[#870D43]" />
                COLEÇÃO DE AFETO 2026!
              </span>
              <span className="text-gray-500 text-sm md:text-base">
                Layouts Prontos Para Encaixar
              </span>
            </div>

            <h1 className="text-3xl md:text-6xl font-fredoka leading-tight md:w-3/5">
              Moldes Criativos &{" "}
              <span className="text-primary block md:inline">
                Coleções Prontas
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl">
              Sem tempo para diagramar? Escolha nossos moldes afetivos
              exclusivos, encaixe suas fotos favoritas e nós cuidamos da
              impressão impecável com laminação aveludada e ímã integral.
            </p>
          </div>
        </div>

        {/* Banner de Desconto por Quantidade */}
        <div className="flex flex-col lg:flex-row w-full bg-primary/5 border border-primary/20 rounded-2xl p-5 md:p-6 gap-6 lg:items-center lg:justify-between shadow-sm">
          <div className="flex gap-4 items-center flex-1">
            <div className="flex w-12 h-12 md:w-14 md:h-14 shrink-0 aspect-square bg-primary items-center justify-center rounded-xl shadow-sm">
              <LucidePercent className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-sm md:text-lg font-bold text-gray-800 leading-tight">
                Economize no Pacotinho: Desconto por Quantidade
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 leading-snug">
                Combine moldes diferentes no mesmo pedido e garanta descontos
                automáticos no carrinho!
              </p>
            </div>
          </div>

          {/* Bloco de Descontos Interativo */}
          <div className="w-full lg:w-auto">
            <nav className="grid grid-cols-4 gap-2 lg:flex lg:flex-row lg:gap-3 justify-center w-full">
              {menuDescont.map((item) => {
                const isActiveDiscount = activeDiscountId === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveDiscountId(item.id)}
                    className={`flex flex-col items-center justify-center w-full lg:w-24 aspect-square text-center p-1.5 transition-all cursor-pointer ${
                      isActiveDiscount
                        ? "bg-primary text-white rounded-full shadow-md scale-105 font-bold"
                        : "bg-primary/10 text-primary rounded-full hover:bg-primary/20"
                    }`}
                  >
                    <span className="text-[9px] md:text-xs opacity-90">
                      {item.quantity}
                    </span>
                    <span className="text-sm md:text-lg font-bold leading-none my-1">
                      {item.descountLabel}
                    </span>
                    <span className="text-[7px] md:text-[9px] uppercase font-semibold tracking-wider opacity-80">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Área de Filtros e Busca */}
        <div className="w-full flex flex-col justify-center gap-6 pb-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Input de Busca */}
            <div className="flex bg-white border border-gray-200 rounded-full px-4 py-2.5 items-center gap-2 shadow-sm w-full md:w-80">
              <LucideSearch size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Buscar por tema ou ocasião..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none outline-none text-sm w-full bg-transparent text-gray-700"
              />
            </div>

            {/* Menu de Formatos */}
            <nav className="flex gap-2 items-center overflow-x-auto pb-2 md:pb-0 scrollbar-none justify-start md:justify-end">
              {FORMATS.map((fmt) => {
                const isActive = selectedFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`flex shrink-0 justify-center items-center transition-all duration-200 text-xs md:text-sm px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-sm font-semibold"
                        : "text-gray-700 bg-secondary/40 hover:bg-primary/80 hover:text-white"
                    }`}
                  >
                    {fmt.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Menu de Temas / Categorias */}
          <nav className="w-full flex overflow-x-auto items-center gap-2 md:gap-3 pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActiveTheme = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex shrink-0 justify-center items-center transition-all duration-200 text-xs md:text-sm px-4 py-2 rounded-full whitespace-nowrap cursor-pointer ${
                    isActiveTheme
                      ? "bg-pink-600 text-white shadow-md font-semibold"
                      : "text-gray-700 bg-rose-50 hover:bg-rose-100"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Grid de Cards de Moldes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredModels.length > 0 ? (
              filteredModels.map((item) => (
                <div
                  key={item.id}
                  className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col items-center relative hover:shadow-lg transition-shadow"
                >
                  {/* Badges superiores */}
                  <div className="w-full flex justify-between items-center mb-3">
                    {item.badge ? (
                      <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium flex flex-row items-center">
                        <LucideFlame size={16} /> {item.badge}
                      </span>
                    ) : (
                      <div />
                    )}
                    <span className="text-xs bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full font-medium">
                      {item.format === "quadrado"
                        ? "Quadrado 5cm"
                        : item.format === "redondo"
                          ? "Redondo 5cm"
                          : "Conjunto ( Quadrado e Redondo )"}
                    </span>
                  </div>

                  {/* Exibição Direta da Imagem Mockupada (Pronta do Corel/Design) */}
                  <div className="w-48 h-48 my-2 flex items-center justify-center overflow-hidden drop-shadow-md relative group">
                    {item.image ? (
                      <img
                        src={item.image ?? "/button"}
                        alt={item.title}
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 hover:transform rotate-3 hover:rotate-0"
                      />
                    ) : (
                      // Fallback caso não haja imagem cadastrada ainda
                      <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
                        Sem Imagem
                      </div>
                    )}

                    {/* Botão de Zoom posicionado de forma absoluta dentro do container da imagem */}
                    {item.image && (
                      <button
                        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100"
                        onClick={() => setImagemAtiva(item as any)}
                        title="Visualizar em tela cheia"
                      >
                        <LucideZoomIn size={18} />
                      </button>
                    )}
                  </div>

                  {/* Títulos do Card */}
                  <div className="text-center mt-3">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="w-full px-4 py-2 flex flex-col md:flex-row justify-between font-fredoka bg-secondary/10">
                    <div className="flex flex-col pb-4">
                      <h3>A partir de</h3>
                      <h1 className="flex flex-row text-3xl font-bold text-primary">
                        R$ {item.price}
                        <span className="text-[10px] items-end text-gray-400 font-normal pl-2">
                          /un
                        </span>
                      </h1>
                    </div>
                    <Link
                      key={item.id}
                      href={`/details/${item.id}`}
                      className={`flex flex-row items-center justify-center md:my-4 w-full lg:w-30 text-center py-3 cursor-pointer bg-primary rounded-2xl uppercase gap-2`}
                    >
                      <LucidePencilSparkles className="text-white" size={16} />
                      <p className="text-white text-xs">usar molde</p>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                Nenhum molde encontrado para os filtros selecionados.
              </div>
            )}
            {imagemAtiva && (
              <ImageZoom
                imagem={imagemAtiva as any}
                onClose={() => setImagemAtiva(null)} // Reseta o estado para fechar
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
