"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Главная", url: "/" },
  { id: 2, title: "Меню", url: "/menu" },

  { id: 3, title: "Корзина ", url: "/cart" },
];
function NavbarMini() {
  const [open, setOpen] = useState(false);
  const { status } = useSession()
  let user = false
  if(status === "authenticated") user = true

  
  return (
    <div className=" p-4 bg-gradient-to-r  ">
      <div className="absolute z-20 ">
        <Image
          src={open ? "/close.png" : "/open.png"}
          alt=""
          width={22}
          height={22}
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        />
      </div>
      {open && (
        <>
          <div className="absolute left-0 top-2 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center  z-10 bg-black">
            {links.map((item) => (
              <Link
                className="relative text-2xl text-gray-400 font-bold no-underline px-3 py-2 transition hover:text-yellow-300 font-serif	"
                href={item.url}
                key={item.id}
                onClick={() => setOpen(false)}
              >
                {item.title}
                <span className="itemMenu"></span>
              </Link>
            ))}

            <Link
              className="relative text-2xl text-gray-400 font-bold no-underline px-3 py-2 transition hover:text-yellow-300 font-serif	"
              href={user ? "/orders" : "/sign-in"}
              onClick={() => setOpen(false)}
            >
              {user ? "Заказы" : "Вход"}
              <span className="itemMenu"></span>
            </Link>
            {user && (
              <Link
                href="/"
                className="relative text-2xl text-gray-400 font-bold no-underline px-3 py-2 transition hover:text-yellow-300 font-serif	"
              >
                Выход
                <span
                  onClick={() => signOut()}
                  className="itemMenu"
                ></span>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default NavbarMini;
