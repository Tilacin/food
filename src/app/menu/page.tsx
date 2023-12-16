
import { MenuType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Ошибка!");
  }
  return res.json();
};

//Меню с категориями

const MenuPage = async () => {
  const menu: MenuType = await getData();
  return (
    <div
      className=" p-2 lg:px-20 xl:px-20 flex flex-wrap   
      bg-[url('/1.1.png')] items-center justify-center "
    >
      {menu.map((category) => (
        <Link href={`/menu/${category.slug}`} key={category.id}>
          <div className="flex flex-col m-1 bg-gradient-to-r from-black hover:bg-gray-100 hover:border-4  items-center justify-center border-yellow-500 border-2 hover:border-yellow-300 rounded-3xl  w-[35rem] max-sm:w-full 2xl:w-[40rem]">
            <h1 className="uppercase font-bold text-2xl text-yellow-300 m-1 p-2">
              {category.title}
            </h1>
            <p className="flex  text-lg text-yellow-500 font-bold items-center justify-center mx-2 ">
              {category.desc}
            </p>
            <div className="overflow-hidden rounded-lg">
              <Image
                className=" hover:scale-110 transition duration-500 cursor-pointer object-cover p-2 "
                src={category.img}
                width={450}
                height={1250}
                alt="cart"
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPage;
