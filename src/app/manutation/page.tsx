"use client";
export default function ManutencaoPage() {
  const mensagem = `Olá, preciso de atendimento ao meu projeto urgente`;
  const tel = "5541988420291";
  return (
    <main className="min-h-screen flex items-center justify-center text-black p-6 font-fredoka relative">
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

      <div className="max-w-lg w-full bg-white/60 border border-black/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <span className="inline-block bg-primary/15 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-6">
          Em Manutenção
        </span>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Estamos preparando algo incrível
        </h1>

        <p className="text-slate-600 text-base leading-relaxed mb-6">
          O site da <strong className="text-black">Mimozi</strong> está passando
          pelos últimos ajustes para oferecer a melhor experiência para você.
          Voltamos em breve!
        </p>

        <div className="bg-secondary/20 border border-secondary/40 rounded-xl p-5 mb-8 text-center">
          <p className="text-black text-sm font-medium mb-2">
            * Caso já tenha um projeto conosco e queira atendimento ou ajuda,
            entre em contato com a gente no whatsapp clicando logo abaixo!
          </p>
        </div>

        <a
          href={`https://wa.me/${tel}?text=${mensagem}`}
          target="_blank"
          className="inline-block bg-primary hover:bg-primary/80 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
        >
          <p>Falar Conosco</p>
        </a>

        <footer className="mt-8 text-xs text-slate-600">
          &copy; 2026 Mimozi. Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}
