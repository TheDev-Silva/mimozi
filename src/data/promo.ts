import { Gift, Heart, PartyPopper } from "lucide-react";

export const PROMOCOES_REAIS = [
  {
    id: "inauguracao",
    ativo: true,
    tag: "Inauguração Mimozi 🎉",
    titulo: "Nossa loja on-line já está no ar!",
    subtitulo: "Reserve já com sinal de 50% do valor e garanta descontos!",
    detalhes:
      "Combos Especiais: 1 Foto R$12,90 | Kit 3 R$34,90 | Kit 5 R$59,90 | Kit 10 R$104,90",
    imagem: "/banners/mimozi-2.jpeg", // Coloque a imagem correspondente em public/banners/
    linkTexto: "Garantir Oferta de Inauguração",
    // Parâmetros enviados para a página de briefing/contratação
    targetUrl: "/IdeaDetails?promo=inauguracao&modo=combo",
    bgGradient: "from-secondary to-blue",
    badgeCor: "bg-white/20 text-white",
  },
  {
    id: "eventos",
    ativo: true,
    tag: "Festas & Eventos 🎈",
    titulo: "Lembrancinhas Personalizadas",
    subtitulo: "A partir de 20 unidades por apenas R$ 9,00 cada!",
    detalhes:
      "Personalizadas com o tema da sua festa + cartão suporte com laminação aveludada.",
    imagem: "/banners/mimozi-3.jpeg",
    linkTexto: "Pedir Lembrancinhas para Evento",
    targetUrl: "/IdeaDetails?promo=eventos&minQty=20&tipo=lembrancinha",
    bgGradient: "from-secondary to-indigo-800",
    badgeCor: "bg-purple-400/30 text-white",
  },
  {
    id: "polaroid",
    ativo: true,
    tag: "Ímãs Polaroid 📸",
    titulo: "Fotos Polaroid 7x10 cm",
    subtitulo: "Apenas R$ 4,00 cada (A partir de 20 unidades)",
    detalhes:
      "Transforme suas fotos do celular em lembranças físicas inesquecíveis.",
    imagem: "/banners/mimozi-1.jpeg",
    linkTexto: "Monte seu Kit Polaroid",
    targetUrl: "/IdeaDetails?promo=polaroid&minQty=20&tamanho=7x10",
    bgGradient: "from-primary to-secondary",
    badgeCor: "bg-amber-300/30 text-white",
  },
];
