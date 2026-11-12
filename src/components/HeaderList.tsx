import {
  LucideHome,
  BookOpen,
  Sliders,
  MessageSquareQuote,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const menuItems = [
  { id: "hero", label: "Início", icon: LucideHome },
  { id: "catalogo", label: "Catálogo e moldes", icon: BookOpen },
  { id: "etiqueta", label: "Personalizador Online", icon: Sliders },
  {
    id: "depoimentos",
    label: "Depoimentos & Cuidados",
    icon: MessageSquareQuote,
  },
  { id: "sobre", label: "sobre Nós", icon: BookOpen },
];

export default function HeaderList() {
  const [activeSection, setActiveSection] = useState(menuItems[0].id);

  // Identifica a seção visível durante a rolagem.
  useEffect(() => {
    const sections = menuItems.map((item) => item.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = menuItems[0].id;

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section && scrollPosition >= section.offsetTop) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    setActiveSection(id);

    const element = document.getElementById(id);
    if (element) {
      // 1. Pega a posição do elemento em relação ao topo da página
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;

      // 2. Subtrai a altura do seu Header fixo (ex: 80px) para o título não ficar escondido embaixo dele
      const offsetPosition = elementPosition - 150;

      // 3. Rrola exatamente para o início da seção
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixer backdrop-blur-md fixed md:top-29 top-16 left-0 right-0 z-50 w-full border-b border-gray-200/20 px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-center py-2 font-fredoka">
        <nav className="w-full flex flex-row items-center justify-center gap-2 md:gap-4 text-xs">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavigation(e, item.id)}
                className={`flex items-center justify-center w-11 h-11 md:w-auto md:px-5 md:h-auto py-3 rounded-full font-playfair transition-all duration-200 text-sm ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-800 bg-secondary/40 hover:bg-primary/80 hover:text-white"
                }`}
              >
                {/* Ícone visível em todas as telas ou apenas no mobile */}
                <IconComponent size={16} className="md:mr-2 shrink-0" />

                {/* Texto: oculto no mobile (hidden), visível de tablet em diante (md:inline) */}
                <span className="hidden md:inline whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
