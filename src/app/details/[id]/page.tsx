import GaleriaProdutoInteractive from "@/src/components/GaleryDetails";
import { Header } from "@/src/components/layout/Header";
import { BOTTON_MODELS } from "@/src/data/buttons";
// Você criará este componente cliente abaixo
import {
  LucidePencilSparkles,
  LucideFlame,
  LucideShoppingCart,
  LucideShoppingBag,
} from "lucide-react";

export default async function DetailsItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Alterado para .find para pegar o objeto diretamente ao invés de usar loops .map desnecessários
  const item = BOTTON_MODELS.find((model) => model.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 font-fredoka">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative flex flex-col md:flex-row w-full min-h-screen items-center justify-center overflow-hidden font-fredoka">
        <div
          style={{
            backgroundImage: `url(/logomimozi.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            zIndex: -10,
            position: "absolute",
            display: "flex",
            width: "100%",
            inset: 0,
          }}
        />
        {/* Lado Esquerdo: Galeria de Imagens Interativa (Ocupa 50% da tela) */}
        <div className="flex w-full md:w-1/2 flex-col md:flex-row pt-36 justify-center items-center gap-6 min-h-[50vh] md:min-h-screen p-6 border-r border-primary/20">
          <GaleriaProdutoInteractive
            imagemInicial={item.image}
            imagensArray={(item.images as string[]) || [item.image]}
            titulo={item.title}
          />
        </div>

        {/* Lado Direito: Informações de Valores, Quantidade, etc. (Ocupa 50% da tela) */}
        <div className="flex w-full md:w-1/2 flex-col justify-center p-8 md:p-16 gap-6 min-h-[50vh] md:min-h-screen">
          {/* Títulos e Badges */}
          <div>
            {item.badge && (
              <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-medium flex flex-row items-center w-fit gap-1 mb-2">
                <LucideFlame size={14} /> {item.badge}
              </span>
            )}
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {item.title}
            </h1>
            {item.subtitle && (
              <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
            )}
          </div>

          {/* Bloco de Detalhes Técnicos */}
          <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Formato do Produto:</span>
              <span className="font-semibold uppercase bg-cyan-100 text-gray-800 px-3 py-0.5 rounded-md text-xs">
                {item.format === "quadrado"
                  ? "Quadrado 5cm"
                  : item.format === "redondo"
                    ? "Redondo 5cm"
                    : "Conjunto"}
              </span>
            </div>

            <div className="border-t border-rose-100/50 my-1" />

            {/* Seletor Ilustrativo de Quantidade */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Quantidade Mínima:</span>
              <span className="font-medium text-gray-800">1 unidade</span>
            </div>

            <div className="border-t border-rose-100/50 my-1" />

            {/* Exibição de Valores */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Preço Especial</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-semibold text-primary">R$</span>
                <h2 className="text-4xl font-extrabold text-primary tracking-tight">
                  {item.price}
                </h2>
                <span className="text-xs text-gray-400 pl-1">/unidade</span>
              </div>
            </div>
          </div>

          {/* Botão de Ação Principal */}
          <button className="flex flex-row items-center justify-center w-full text-center py-4 cursor-pointer bg-primary hover:bg-primary/95 rounded-2xl uppercase gap-2 font-bold text-white shadow-md active:scale-[0.98] transition-all duration-200">
            <LucideShoppingBag className="text-white" size={18} />
            <span className="text-sm tracking-wider">Adicionar ao carinho</span>
          </button>
        </div>
      </div>
    </>
  );
}
