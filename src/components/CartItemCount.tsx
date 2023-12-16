"use client";
import { useCartStore } from "@/utils/store";

import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, [totalItems]);

  return (
    <div className="flex ">
      <Link
        href="/cart"
        className="relative text-xl text-gray-500 font-bold no-underline px-3 py-2 transition hover:text-yellow-300 font-serif	"
      >
        Корзина({totalItems})
        <span className="absolute z-0 left-0 top-0 w-full h-full border-solid border-b-2 border-yellow-300 rounded-2xl translate-y-2 opacity-0 transition hover:scale-100 hover:translate-y-0 hover:opacity-100"></span>
      </Link>
    </div>
  );
};

export default CartIcon;
