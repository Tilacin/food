"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();
  return (
    <div className="hidden md:flex gap-4 items-center ">
      {status === "authenticated" ? (
        <><Link
          href="/orders"
          className="relative text-xl text-gray-500 font-bold no-underline  px-3 py-2 transition hover:text-yellow-300 font-serif	">
          Заказы
          <span className="absolute z-0 left-0 top-0 w-full h-full border-solid border-b-2 border-yellow-300 rounded-2xl translate-y-2 opacity-0 transition hover:scale-100 hover:translate-y-0 hover:opacity-100"></span>{" "}
        </Link>
         
          <Link href="/"  className="relative text-xl text-gray-500 font-bold no-underline px-3 py-2 transition hover:text-yellow-300 font-serif	">Выход
          <span onClick={()=>signOut()} className="absolute z-0 left-0 top-0 w-full h-full border-solid border-b-2 border-yellow-300 rounded-2xl translate-y-2 opacity-0 transition hover:scale-100 hover:translate-y-0 hover:opacity-100"></span>
        </Link>
        </>
      ) : (
        <Link
          href="/sign-in"
          className="relative text-xl text-gray-500 font-bold no-underline  px-3 py-2 transition hover:text-yellow-300 font-serif	"
        >
          {" "}
          Вход
          <span className="absolute z-0 left-0 top-0 w-full h-full border-solid border-b-2 border-yellow-300 rounded-2xl translate-y-2 opacity-0 transition hover:scale-100 hover:translate-y-0 hover:opacity-100"></span>
        </Link>
      )}
    </div>
  );
};

export default UserLinks;
