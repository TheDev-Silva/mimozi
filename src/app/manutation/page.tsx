export default function ManutencaoPage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-black p-6 font-fredoka">
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
      <div></div>
      <div className="max-w-lg w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <span className="inline-block bg-sky-400/15 text-primary text-xs font-semibold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-6">
          Em Manutenção
        </span>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Estamos preparando algo incrível
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-8">
          O site da <strong className="text-black">Mimozi</strong> está passando
          pelos últimos ajustes para oferecer a melhor experiência para você.
          Voltamos em breve!
        </p>

        {/* Opcional: troque pelo link do seu WhatsApp ou Instagram, ou remova este bloco */}
        <a
          href="https://wa.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary hover:bg-primary/80 text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
        >
          Falar conosco
        </a>

        <footer className="mt-8 text-xs text-slate-500">
          &copy; 2026 Mimozi. Todos os direitos reservados.
        </footer>
      </div>
    </main>
  );
}
