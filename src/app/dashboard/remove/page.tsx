"use client";

import React, { useState, useEffect } from "react";
import { ProductType } from "@/types/types";
import DeleteButton from "@/components/DeleteButton";
import Image from "next/image";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw Error("Не удалось получить продукты!");
    }

    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex justify-between p-4">
        <h2>Удалить продукт</h2>
        
      </div>
      <div className="p-4">
        <div className=" m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid grid-cols-4  items-center justify-between cursor-pointer">
            <span>Название</span>
            <span className="sm:text-left text-right">Цена</span>
            <span >Изображение</span>
            <span >Удалить</span>
          </div>
          <ul>
            {products.map((product) => (
              
                <li
                  key={product.id}
                  className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid grid-cols-4  items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <p className="pl-4">{product.title}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    {product.price}
                  </p>
                  {product.img && <Image src={product.img} width={70}  height={50} alt={product.title} />}
                  
                    <div>
                      <DeleteButton id={product.id} />
                    </div>
                  
                </li>
              
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
