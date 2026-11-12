export interface BottonModel {
  id: string;
  title: string;
  subtitle?: string;
  theme:
    | "datas_especiais"
    | "casal_namorados"
    | "familia_bebes"
    | "pets"
    | "musica_spotify"
    | "polaroid_vintage"
    | "fans";
  format: "quadrado" | "redondo" | "conjunto";
  badge?: string;
  image: string;
  images?: String[];
  price?: string;
}

export const CATEGORIES = [
  { id: "todos", label: "Todos os Moldes (38)" },
  { id: "datas_especiais", label: "Datas Especiais" },
  { id: "casal_namorados", label: "Casal & Namorados" },
  { id: "familia_bebes", label: "Família & Bebês" },
  { id: "pets", label: "Pets & Bichinhos" },
  { id: "musica_spotify", label: "Música & Spotify" },
  { id: "polaroid_vintage", label: "Polaroid Vintage" },
  { id: "fans", label: "Dedicado Fã" },
];

export const FORMATS = [
  { id: "todos", label: "Todos" },
  { id: "conjunto", label: "Combo Perfeito" },
  { id: "quadrado", label: "Quadrado 5x5cm" },
  { id: "redondo", label: "Redondo 5cm" },
];

export const menuDescont = [
  {
    id: "1",
    quantity: "1 a 5 un",
    descountLabel: "Valor Base",
    label: "Sem desconto",
  },
  {
    id: "2",
    quantity: "6 a 15 un",
    descountLabel: "15% OFF",
    label: "Mais pedido",
  },
  {
    id: "3",
    quantity: "16 a 49 un",
    descountLabel: "30% OFF",
    label: "Festas & Chá",
  },
  {
    id: "4",
    quantity: "100+ un",
    descountLabel: "50% OFF",
    label: "Eventos VIP",
  },
];

// Se preferir manter em uma única lista, mas organizada e comentada por blocos de temas:
export const BOTTON_MODELS: BottonModel[] = [
  // --- POLAROID & VINTAGE ---
  {
    id: "1",
    title: "Pra Recordar",
    subtitle: "Uma Boa Comanhia",
    theme: "polaroid_vintage",
    format: "quadrado",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-1-quadrado.jpeg",
    images: [
      "/quadrado/polaroid-1-quadrado.jpeg",
      "/quadrado/polaroid-1-redondo.jpeg",
      "/mockups/polaroid-1.jpeg",
    ],
    price: "4.50",
  },
  {
    id: "2",
    title: "Pra Recordar",
    subtitle: "Sempre Em Boa Comanhia",
    theme: "polaroid_vintage",
    format: "redondo",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-1-redondo.jpeg",
  },
  {
    id: "1.2",
    title: "Pra Recordar",
    subtitle: "Sempre Em Boa Comanhia",
    theme: "polaroid_vintage",
    format: "conjunto",
    badge: "Par Perfeito",
    image: "/mockups/polaroid-1.jpeg",
  },
  {
    id: "3",
    title: "Vivendo A Calmaria",
    subtitle: "Dia Calmo",
    theme: "polaroid_vintage",
    format: "quadrado",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-2-quadrado.jpeg",
  },
  {
    id: "4",
    title: "Vivendo A Calmaria",
    subtitle: "Dia Calmo",
    theme: "polaroid_vintage",
    format: "redondo",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-2-redondo.jpeg",
  },
  {
    id: "3.4",
    title: "Vivendo A Calmaria",
    subtitle: "Dia Calmo",
    theme: "polaroid_vintage",
    format: "conjunto",
    badge: "Par Perfeito",
    image: "/mockups/polaroid-2.jpeg",
  },
  {
    id: "5",
    title: "Meu Momento",
    subtitle: "Meu Momento",
    theme: "polaroid_vintage",
    format: "quadrado",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-3-quadrado.jpeg",
  },
  {
    id: "6",
    title: "Nossos Melhores Dias",
    subtitle: "Dia Calmo",
    theme: "polaroid_vintage",
    format: "redondo",
    badge: "Par Perfeito",
    image: "/quadrado/polaroid-3-redondo.jpeg",
  },
  {
    id: "5.6",
    title: "Nossos Melhores Dias",
    subtitle: "Dia Calmo",
    theme: "polaroid_vintage",
    format: "conjunto",
    badge: "Par Perfeito",
    image: "/mockups/polaroid-3.jpeg",
  },
  {
    id: "7",
    title: "Instantes ",
    subtitle: "Instantes Felizes",
    theme: "polaroid_vintage",
    format: "quadrado",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-4-quadrado.png",
  },
  {
    id: "8",
    title: "Instantes",
    subtitle: "Instantes Felizes",
    theme: "polaroid_vintage",
    format: "redondo",
    badge: "Mais Amado",
    image: "/quadrado/polaroid-4-redondo.png",
  },
  {
    id: "7.8",
    title: "Instantes",
    subtitle: "Instantes Felizes",
    theme: "polaroid_vintage",
    format: "conjunto",
    badge: "Par Perfeito",
    image: "/mockups/polaroid-4.png",
  },

  // --- DATAS ESPECIAIS ---
  {
    id: "9",
    title: "O Dia Mais Esperado Da Criançada",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "quadrado",
    image: "/quadrado/polaroid-3-quadrado.jpeg",
  },
  {
    id: "10",
    title: "O Dia Mais Esperado Da Criançada",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/mockups/polaroid-4.png",
  },
  {
    id: "9.10",
    title: "O Dia Mais Esperado Da Criançada",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/mockups/polaroid-4.png",
  },
  {
    id: "11",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "quadrado",
    image: "/datas_especiais/dia-dos-pais.png",
  },
  {
    id: "12",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/datas_especiais/dia-dos-pais.png",
  },
  {
    id: "11.12",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/datas_especiais/dia-dos-pais.png",
  },
  {
    id: "13",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/datas_especiais/dia-dos-pais.png",
  },
  {
    id: "14",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/datas_especiais/dia-dos-pais.png",
  },
  {
    id: "13.14",
    title: "Feliz Dia Dos Pais",
    subtitle: "Novembro 2024",
    theme: "datas_especiais",
    format: "redondo",
    image: "/datas_especiais/dia-dos-pais.png",
  },

  /* {
    id: "2",
    title: "Partilhar • Rubel & Anavitória",
    theme: "musica_spotify",
    format: "quadrado",
    badge: "QR Interativo",
    image: "/mockups/polaroid-2.jpeg",
  },*/
  // --- PETS & BICHINHOS ---
  {
    id: "15",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "quadrado",
    image: "/quadrado/pets-1-quadrado.png",
    price: "4,90",
  },
  {
    id: "16",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "redondo",
    image: "/quadrado/pets-1-redondo.jpg",
    price: "4,90",
  },
  {
    id: "15.16",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "conjunto",
    image: "/mockups/pets-1.png",
    price: "4,90",
  },
  {
    id: "17",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "quadrado",
    image: "/quadrado/pets-2-quadrado.jpg",
    price: "4,50",
  },
  {
    id: "18",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "redondo",
    image: "/quadrado/pets-2-redondo.jpg",
    price: "4,50",
  },
  {
    id: "17.18",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "conjunto",
    image: "/mockups/pets-2.png",
    price: "4,50",
  },
  {
    id: "19",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "quadrado",
    image: "/quadrado/pets-3-quadrado.jpg",
    price: "4,50",
  },
  {
    id: "20",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "redondo",
    image: "/quadrado/pets-3-redondo.jpg",
    price: "4,50",
  },
  {
    id: "19.20",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "conjunto",
    image: "/mockups/pets-3.png",
    price: "4,50",
  },
  {
    id: "21",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "quadrado",
    image: "/quadrado/pets-4-quadrado.jpg",
    price: "4,50",
  },
  {
    id: "22",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "redondo",
    image: "/quadrado/pets-4-redondo.jpg",
    price: "4,50",
  },
  {
    id: "21.22",
    title: "Momento Pet Especial",
    theme: "pets",
    format: "conjunto",
    image: "/mockups/pets-4.png",
    price: "4,50",
  },
];
