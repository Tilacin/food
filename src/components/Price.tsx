"use client";

import { ProductType } from "@/types/types";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  
const { addToCart } = useCartStore();

  useEffect(()=>{
    useCartStore.persist.rehydrate()
  },[])

  useEffect(() => {
    
      setTotal(
        quantity * product.price 
      );
    
  }, [quantity, product.price]);

  const handleCart = ()=>{
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
     
      quantity: quantity,
    })
    toast.success("Товар добавлен в корзину!")
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
     
      
      {/* КОЛИЧЕСТВО И КНОПКА ДОБАВЛЕНИЯ */}
      <div className="flex justify-between items-center max-sm:flex-col gap-2">
        {/* Количество */}
        <div className="flex justify-between  w-full p-3 ring-1 ring-amber-500 rounded-xl ">
          <span className="px-2">Количество</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* КНОПКА "КОРЗИНА" */}
        <button
          className="uppercase w-56 bg-orange-500 text-white p-3 ring-1 ring-amber-500 rounded-xl max-sm:w-full "
          onClick={handleCart}
        >
         Добавить
        </button>
      </div>
    </div>
  );
};

export default Price;