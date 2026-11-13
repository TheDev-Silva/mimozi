"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  ShieldCheck,
  Sparkles,
  Tag,
  Phone,
  MessageSquare,
  AlertCircle,
  Calendar,
  Mail,
  Copy,
  Check,
  X,
  HandCoins,
} from "lucide-react";

const EMAIL_OFICIAL = "contatomimozi.personalizados@gmail.com";
const WHATSAPP_MIMOZI = "5541997759542";

const CATALOGO_PROMOCOES: Record<
  string,
  {
    id: string;
    titulo: string;
    subtitulo: string;
    imagem: string;
    precoUnitario: number;
    minimoUnidades: number;
    isCombo?: boolean;
    combos?: { label: string; qtd: number; precoTotal: number }[];
    beneficios: string[];
    observacaoEntrega: string;
    corDestaque: string;
  }
> = {
  inauguracao: {
    id: "inauguracao",
    titulo: "Combos Especiais de Inauguração",
    subtitulo: "Pequenos detalhes, grandes memórias ❤️",
    imagem: "/banners/mimozi-2.jpeg",
    precoUnitario: 12.9,
    minimoUnidades: 1,
    isCombo: true,
    combos: [
      { label: "1 Foto Ímã", qtd: 1, precoTotal: 12.9 },
      { label: "Kit 3 Foto Ímãs", qtd: 3, precoTotal: 34.9 },
      { label: "Kit 5 Foto Ímãs", qtd: 5, precoTotal: 59.9 },
      { label: "Kit 10 Foto Ímãs", qtd: 10, precoTotal: 104.9 },
    ],
    beneficios: [
      "Garanta seu pedido com apenas 50% de sinal (garantia para iniciar)",
      "Presente criativo e lembranças que duram",
      "Decora sua geladeira com alta qualidade de impressão",
    ],
    observacaoEntrega: "Entregas a partir de 14/11",
    corDestaque: "bg-[#E51571]",
  },
  eventos: {
    id: "eventos",
    titulo: "Lembrancinhas Personalizadas para Evento",
    subtitulo: "Transforme sua festa em uma lembrança inesquecível!",
    imagem: "/banners/mimozi-3.jpeg",
    precoUnitario: 9.0,
    minimoUnidades: 20,
    beneficios: [
      "Ímã acompanhado de cartão personalizado com o tema da sua festa",
      "Qualidade incrível de acabamento e impressão",
      "Lembrança que o seu convidado ama e guarda",
    ],
    observacaoEntrega: "Pedido mínimo a partir de 20 unidades",
    corDestaque: "bg-purple-700",
  },
  polaroid: {
    id: "polaroid",
    titulo: "Ímãs Polaroid Personalizados (7x10 cm)",
    subtitulo: "Transformando suas fotos em lembranças especiais!",
    imagem: "/banners/mimozi-2.jpeg",
    precoUnitario: 4.0,
    minimoUnidades: 20,
    beneficios: [
      "Ímã 7x10 cm personalizado com o tema da sua festa ou foto",
      "Qualidade incrível com acabamento impecável",
      "Tamanho perfeito de 7x10 cm para geladeiras e murais",
    ],
    observacaoEntrega: "Pedido mínimo a partir de 20 unidades",
    corDestaque: "bg-amber-600",
  },
};

function PurchaseContent() {
  const searchParams = useSearchParams();
  const promoParam = searchParams.get("promo") || "inauguracao";
  const produto =
    CATALOGO_PROMOCOES[promoParam] || CATALOGO_PROMOCOES.inauguracao;

  const [selectedComboIndex, setSelectedComboIndex] = useState<number>(3);
  const [quantity, setQuantity] = useState<number>(produto.minimoUnidades);
  const [details, setDetails] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [isSent, setIsSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    setQuantity(produto.minimoUnidades);
  }, [produto]);

  const valorTotal =
    produto.isCombo && produto.combos
      ? produto.combos[selectedComboIndex].precoTotal
      : quantity * produto.precoUnitario;

  const quantidadeFinal =
    produto.isCombo && produto.combos
      ? produto.combos[selectedComboIndex].qtd
      : quantity;

  const handleOpenDecisionModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim()) {
      setError("Por favor, informe seu número de WhatsApp para continuarmos.");
      return;
    }
    setError(null);
    setShowModal(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_OFICIAL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleConfirmAndSendWhatsApp = (metodoEnvio: "email" | "whatsapp") => {
    const resumoOferta =
      produto.isCombo && produto.combos
        ? `Combo Escolhido: *${produto.combos[selectedComboIndex].label}*`
        : `Quantidade: *${quantidadeFinal} unidades* (R$ ${produto.precoUnitario
            .toFixed(2)
            .replace(".", ",")} cada)`;

    const textoDecisaoFotos =
      metodoEnvio === "email"
        ? `📧 *Envio das Fotos:* O cliente optou por enviar em ALTA QUALIDADE para o e-mail (${EMAIL_OFICIAL}), com preferência em formato PDF.`
        : `📱 *Envio das Fotos:* O cliente optou por enviar diretamente por aqui no WhatsApp (preferencialmente em PDF para manter a qualidade).`;

    const mensagem = encodeURIComponent(
      `💖 *NOVO PEDIDO DE OFERTA - MIMOZI* 💖\n\n` +
        `🏷️ *Promoção:* ${produto.titulo}\n` +
        `📦 *${resumoOferta}*\n` +
        `💰 *Valor Total:* R$ ${valorTotal.toFixed(2).replace(".", ",")}\n` +
        (produto.id === "inauguracao"
          ? `💳 *Condição de Pagamento:* Sinal de 50% (R$ ${(valorTotal / 2)
              .toFixed(2)
              .replace(".", ",")}) para garantia e início da produção.\n`
          : "") +
        `\n${textoDecisaoFotos}\n` +
        `\n📝 *Observações / Detalhes:*\n${
          produto.id !== "inauguracao"
            ? details || "A combinar no atendimento."
            : "Reserva Combo Inauguração (50% de sinal)"
        }\n\n` +
        `📞 *WhatsApp do Cliente:* ${whatsapp}`,
    );

    window.open(`https://wa.me/${WHATSAPP_MIMOZI}?text=${mensagem}`, "_blank");
    setShowModal(false);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white p-8 rounded-3xl shadow-xl border border-primary/20 text-center space-y-6 font-fredoka">
        <CheckCircle2 size={64} className="text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-800">
          Pedido Iniciado com Sucesso!
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Abrimos o WhatsApp da <strong>Mimozi</strong> com o resumo do seu
          pedido e a sua preferência de envio. Lembre-se de encaminhar os
          arquivos (preferencialmente em PDF) para{" "}
          <strong className="text-primary">{EMAIL_OFICIAL}</strong> se optar
          pelo e-mail!
        </p>
        <Link
          href="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-primary/80 transition-all shadow-md"
        >
          Voltar para a Loja
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 font-fredoka relative">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar para as Ofertas
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLUNA ESQUERDA: VITRINE */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-6">
          <div className="relative w-full aspect-4/5 max-h-115 rounded-2xl overflow-hidden bg-pink-50 border border-gray-200 shadow-inner">
            <img
              src={produto.imagem}
              alt={produto.titulo}
              className="w-full h-full object-contain"
            />
            <span
              className={`absolute top-4 left-4 ${produto.corDestaque} text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5`}
            >
              <Sparkles size={14} /> Oferta Oficial Mimozi
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {produto.titulo}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{produto.subtitulo}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2.5">
              <h3 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
                O que está incluso neste produto:
              </h3>
              <ul className="space-y-2">
                {produto.beneficios.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-gray-700"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-primary shrink-0 mt-0.5"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-semibold text-gray-600 bg-primary/5 px-4 py-3 rounded-xl border border-primary/15">
              <Calendar size={16} className="text-primary shrink-0" />
              <span>{produto.observacaoEntrega}</span>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA: CHECKOUT */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-primary/20 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <span className="text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-1">
              <Tag size={14} /> Monte seu Pedido
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
              Escolha a quantidade e finalize
            </h2>
          </div>

          <form onSubmit={handleOpenDecisionModal} className="space-y-6">
            {produto.isCombo && produto.combos ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  1. Selecione o seu Combo Especial:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {produto.combos.map((combo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedComboIndex(idx)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        selectedComboIndex === idx
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-gray-200 bg-white hover:border-primary/40"
                      }`}
                    >
                      <span className="block text-xs font-bold text-gray-800">
                        {combo.label}
                      </span>
                      <span className="block text-lg font-bold text-primary mt-0.5">
                        R$ {combo.precoTotal.toFixed(2).replace(".", ",")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-700 uppercase">
                    1. Quantidade (Mínimo {produto.minimoUnidades} un.)
                  </label>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    R$ {produto.precoUnitario.toFixed(2).replace(".", ",")} /
                    unidade
                  </span>
                </div>

                <input
                  type="number"
                  min={produto.minimoUnidades}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(produto.minimoUnidades, Number(e.target.value)),
                    )
                  }
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-base font-bold text-gray-800 focus:outline-none focus:border-primary"
                />
              </div>
            )}

            {/* RESUMO FINANCEIRO */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Quantidade selecionada:</span>
                <span className="font-bold text-gray-800">
                  {quantidadeFinal} unidade(s)
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-primary/10">
                <span className="text-sm font-bold text-gray-800">
                  Valor Total:
                </span>
                <span className="text-2xl font-bold text-primary">
                  R$ {valorTotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
              {produto.id === "inauguracao" && (
                <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center space-y-0.5">
                  <p>💡 Condição de Início (Garantia):</p>
                  <p className="font-bold">
                    Pague 50% de sinal (R${" "}
                    {(valorTotal / 2).toFixed(2).replace(".", ",")}) para darmos
                    início ao pedido!
                  </p>
                </div>
              )}
            </div>

            {/* TEMA OU DESTAQUE DE INAUGURAÇÃO */}
            {produto.id !== "inauguracao" ? (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  <MessageSquare
                    size={14}
                    className="inline mr-1 text-primary"
                  />
                  2. Tema da festa, frases ou detalhes (Opcional)
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={`Ex: Tema Stitch para aniversário de 5 anos, frase 'Obrigada pela presença'...`}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-3.5 text-sm text-gray-800 focus:outline-none focus:border-primary"
                />
              </div>
            ) : (
              <div className="w-full flex flex-row gap-2 bg-primary/10 border border-primary/40 rounded-xl py-4 items-center justify-center px-4">
                <HandCoins className="text-primary shrink-0" size={22} />
                <h1 className="text-xs md:text-sm font-bold text-center uppercase text-primary">
                  Início mediante sinal de 50% do valor!
                </h1>
              </div>
            )}

            {/* WHATSAPP DO CLIENTE */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                <Phone size={14} className="inline mr-1 text-primary" />
                3. Seu WhatsApp para atendimento *
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => {
                  setWhatsapp(e.target.value);
                  setError(null);
                }}
                placeholder="(41) 99999-9999"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-primary"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={18} /> Garantir Meu Pedido via WhatsApp
            </button>

            <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-500" />
              Você escolherá como enviar suas fotos no próximo passo.
            </p>
          </form>
        </div>
      </div>

      {/* MODAL DE DECISÃO DE ENVIO */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-pink-100 relative space-y-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles size={14} /> Último Passo
              </span>
              <h3 className="text-2xl font-bold text-gray-800">
                Como prefere enviar suas fotos/arquivos?
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                Dica da Mimozi: recomendamos enviar em formato{" "}
                <strong className="text-gray-700">PDF</strong> para manter a
                mais alta qualidade na impressão!
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-primary/30 bg-pink-50/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-primary text-white p-2 rounded-xl">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                        Enviar por E-mail (PDF / Original)
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full uppercase">
                          Recomendado ✨
                        </span>
                      </h4>
                      <p className="text-xs text-gray-500">
                        Perfeito para arquivos e PDFs sem perda de qualidade.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs">
                  <span className="font-semibold text-gray-700 truncate select-all">
                    {EMAIL_OFICIAL}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1 text-primary font-bold hover:underline shrink-0 ml-2 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-600">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmAndSendWhatsApp("email")}
                  className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                >
                  Vou enviar por E-mail → Ir para o WhatsApp
                </button>
              </div>

              <div className="border border-gray-200 bg-gray-50/60 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="bg-emerald-600 text-white p-2 rounded-xl">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-800">
                      Enviar direto pelo WhatsApp
                    </h4>
                    <p className="text-xs text-gray-500">
                      Envie como <strong>Documento (PDF)</strong> ou foto na
                      conversa.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleConfirmAndSendWhatsApp("whatsapp")}
                  className="w-full bg-white border border-gray-300 text-gray-800 py-2.5 rounded-xl font-bold text-xs md:text-sm hover:bg-gray-100 transition-all cursor-pointer"
                >
                  Enviar no WhatsApp mesmo → Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function IdeaDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-fredoka text-primary">
          Carregando detalhes da oferta...
        </div>
      }
    >
      <PurchaseContent />
    </Suspense>
  );
}
