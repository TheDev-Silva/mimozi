"use client";

import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Sidebar, SidebarHeader } from "@/src/components/ui/sidebar";
import {
  Menu,
  ArrowDownRight,
  Search,
  LucideSearch,
  LucideUser,
  LucideUserCircle,
  LucideUserRoundCog,
  LucideChevronRight,
  LucideShoppingCart,
} from "lucide-react";
import { menu } from "motion/react-client";
import { useEffect, useState } from "react";
import { MumoziLogo } from "../MimoziLogo";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const menuItems = [
  { label: "hero", id: "hero" },
  { label: "Sobre", id: "sobre" },
  { label: "etiqueta", id: "etiqueta" },
  { label: "catalogo", id: "catalogo" },
  { label: "Depoimentos", id: "depoimentos" },
];

interface PropsScroll {
  scroll: string | number;
}

export function Header() {
  const [activeSection, setActiveSection] = useState(menuItems[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Identifica a seção visível durante a rolagem.
  useEffect(() => {
    const sections = ["hero", "sobre", "etiqueta", "catalogo", "depoimentos"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = "hero";

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

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderMenuItem = (item: (typeof menuItems)[number]) => {
    const isActive = activeSection === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavigation(item.id)}
        aria-current={isActive ? "location" : undefined}
        className={`
          relative py-2 text-left text-sm uppercase
          transition-all duration-300
          ${
            isActive
              ? "font-bold text-[#74061A]"
              : "font-medium text-black/75 hover:text-black"
          }
        `}
      >
        {item.label}

        <span
          className={`
            absolute bottom-0 left-0 h-.5 bg-[#ED624D]
            transition-all duration-300
            ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}
          `}
        />
      </button>
    );
  };
  const user = {
    name: "João Silva",
  };

  // Botão de contato compartilhado entre desktop e mobile.
  const renderContactButton = () => (
    <button
      type="button"
      onClick={() => handleNavigation("#contato")}
      className="flex items-center gap-2 rounded-full bg-primary w-11 h-11 justify-center text-white transition-colors hover:bg-primary/80"
    >
      <LucideShoppingCart size={22} className="text-white" />
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-secondary/40 backdrop-blur-md font-playfair">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-2 md:px-16">
        <div className="w-full flex flex-row items-center justify-between lg:flex">
          <nav className="w-full hidden items-center justify-between lg:flex py-6">
            <MumoziLogo />
            <div className="w-100 flex bg-amber-50 rounded-full px-4 py-2 items-center justify-between gap-2">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-80 border-none outline-none focus:outline-none"
              />
              <LucideSearch size={20} className="cursor-pointer" />
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-4">
                  {/* <LucideUserCircle size={40} color="#C51264" /> */}
                  <div className="flex items-start justify-start flex-col hover:text-primary transition-colors cursor-pointer">
                    <h1 className="text-xs">Bem-vindo(a)</h1>
                    <div className="w-full flex gap-4">
                      <h3 className="font-bold text-black text-sm">
                        Minha Conta
                      </h3>
                    </div>
                  </div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="w-full flex gap-4 text-center items-center justify-self-start">
                  <div className="w-14 h-14 rounded-3xl bg-primary items-center justify-center flex">
                    <LucideUser size={40} color="#9DC5DE" />
                  </div>
                  <h1 className="text-secondary font-semibold pl-10 ">
                    Olá, {user?.name || "visitante"}
                  </h1>
                </div>
              </HoverCardContent>
            </HoverCard>
          </nav>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            {/* O asChild faz o gatilho usar estritamente o seu <button> nativo */}
            <SheetTrigger
              render={
                <Button
                  type="button"
                  aria-label="Abrir menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 transition-colors hover:opacity-80 lg:hidden "
                >
                  <Menu size={21} />
                </Button>
              }
            />

            {/* O SheetContent lida com a animação e posicionamento lateral automaticamente */}
            <SheetContent
              side="right"
              className="flex w-[85%] flex-col border-l border-black/10 bg-[#F2F2EE] p-6 sm:max-w-sm"
            >
              <SheetHeader className="border-b border-black/10 pb-5 justify-center items-center text-center">
                <SheetTitle className="font-display text-2xl font-semibold uppercase tracking-wide text-black">
                  <img
                    src="/logo-mimozi-3.png"
                    alt="logo"
                    className="w-30 h-auto object-contain justify-center items-center"
                  />
                </SheetTitle>

                {/* CORRIGIDO: Substituído <p> por SheetDescription para seguir o padrão shadcn */}
                <SheetDescription className="text-[12.5px] text-black/60 ">
                  Foto imãs & Bottons
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Navegação mobile"
                className="mt-6 flex flex-col items-start gap-5"
              >
                {menuItems.map(renderMenuItem)}
              </nav>

              {/* Contato fixado no final do painel lateral */}
              <div className="mt-auto border-t border-black/10 pt-6">
                <p className="mt-4 text-center text-xs text-black/50">
                  Infância · Recordações · Momentos inesquecíveis
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {!mobileMenuOpen && (
          <a
            href="#contato"
            onClick={() => handleNavigation("contato")}
            className="ml-22 text-white text-sm font-medium transition-opacity hover:opacity-60"
          >
            {activeSection != "contato" && (
              <div className="flex">{renderContactButton()}</div>
            )}
          </a>
        )}
      </div>
    </header>
  );
}
