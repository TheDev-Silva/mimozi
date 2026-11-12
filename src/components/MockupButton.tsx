"use client";

interface BottonMockupProps {
  imageSrc: string;
  format: "redondo" | "quadrado";
  title: string;
}

export function BottonMockup({ imageSrc, format, title }: BottonMockupProps) {
  const isRedondo = format === "redondo";

  return (
    <div className="relative flex items-center justify-center w-52 h-52">
      {/* Container Geral com a Imagem do Usuário e o Mockup por cima */}
      <div
        className={`relative overflow-hidden flex items-center justify-center ${
          isRedondo ? "rounded-full w-40 h-40" : "rounded-2xl w-40 h-40"
        }`}
      >
        {/* Foto inserida pelo usuário */}
        <img
          src={imageSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Mockup de alumínio por cima com blend mode para misturar o brilho */}
        <img
          src={isRedondo ? "/button_redondo.webp" : "/button_quadrado.webp"}
          alt="Mockup Base"
          className="absolute inset-0 w-full h-full object-cover z-10 mix-blend-overlay opacity-90 pointer-events-none"
        />
      </div>
    </div>
  );
}
