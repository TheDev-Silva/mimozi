"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function MumoziLogo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Link
      href="/"
      aria-label="Mumozi - Página inicial"
      className="inline-flex items-center gap-3"
    >
      {/* Símbolo animado */}
      <motion.div
        className="flex h-12 w-12 items-center justify-center"
        style={{
          backgroundColor: "#F5E3D6",
          border: "4px solid #83B5CC",
          boxSizing: "border-box",
        }}
        animate={
          shouldReduceMotion
            ? { borderRadius: "12px" }
            : { borderRadius: ["12px", "50%"] }
        }
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Coração */}
        <svg
          width="27"
          height="27"
          viewBox="0 0 24 24"
          fill="#C80D60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
      </motion.div>

      {/* Nome */}
      <span className="flex flex-col gap-1">
        <img
          src="/logo-mimozi-3.png"
          alt="logo"
          className="w-30 h-auto object-cover"
        />
        <p className="font-sans font-semibold text-[12px] tracking-widest text-[#83B5CC]">
          Grandes momentos
        </p>
      </span>
    </Link>
  );
}
