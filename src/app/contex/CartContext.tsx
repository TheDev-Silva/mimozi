"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  titulo: string;
  precoUnitario: number;
  quantidade: number;
  tipo: "combo" | "unitario" | "polaroid" | "lembrancinha";
  detalhes?: string;
  imagem?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalValue: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Carrega o carrinho salvo ao abrir o site
  useEffect(() => {
    const savedCart = localStorage.getItem("@mimozi_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erro ao carregar carrinho", e);
      }
    }
  }, []);

  // Salva no LocalStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("@mimozi_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Verifica se já existe um item idêntico para somar a quantidade
      const index = prev.findIndex(
        (i) => i.id === newItem.id && i.detalhes === newItem.detalhes,
      );
      if (index > -1) {
        const updated = [...prev];
        updated[index].quantidade += newItem.quantidade;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("@mimozi_cart");
  };

  const getTotalValue = () => {
    return cart.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0,
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantidade, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalValue,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
