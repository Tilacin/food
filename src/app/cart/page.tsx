"use client";
import { useCartStore } from "@/utils/store";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  const { data: session } = useSession();
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDisabled(false);
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/sign-in");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
            address,
          }),
        });

        const data = await res.json();
        products.forEach((item) => removeFromCart(item));
        router.push(`/buy`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="h-screen  flex flex-col text-amber-500 lg:flex-row">
      {/* КОНТЕЙНЕР ДЛЯ ПРОДУКТОВ */}
      <div className=" p-4 flex flex-col  justify-center overflow-scroll lg:w-1/2   h-full">
        {/* ОТДЕЛЬНЫЙ ЭЛЕМЕНТ */}
        {products.map((item) => (
          <div
            className="flex items-center justify-between mb-4 max-sm:flex-col"
            key={item.id}
          >
            {item.img && (
              <Image src={item.img} alt="" width={100} height={100} />
            )}
            <div className="">
              <h1 className="uppercase text-xl font-bold">
                {item.title} x{item.quantity}
              </h1>
            </div>
            <h2 className="font-bold">${item.price}</h2>
            <button
              className="cursor-pointer bg-orange-500 p-1 rounded-md  text-white"
              onClick={() => removeFromCart(item)}
            >
              отмена
            </button>
          </div>
        ))}
      </div>

      {/* ПЛАТЕЖНЫЙ КОНТЕЙНЕР */}
      <div className="h-1/2 p-4 bg-orange-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/2 2xl:w-1/2 lg:px-10 px-4 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Всего продуктов ({totalItems} )</span>
          <span className="">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Стоимость обслуживания</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Стоимость доставки</span>
          <span className="text-green-500">БЕСПЛАТНО!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">ИТОГО(ВКЛ. НДС)</span>
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div>
          <form onSubmit={handleCheckout} className="flex flex-col ">
            <label htmlFor="first" className="p-2">
              Введите адрес:
            </label>
            <input
              placeholder="ул.Название, д 1, кв 11"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="flex justify-center my-4 mx-auto  bg-orange-500 text-white p-2 rounded-md  self-end"
              type="submit"
              onClick={handleSubmit}
            >
              Сохранить адрес
            </button>
          </form>
        </div>

        <button
          className={
            disabled
              ? "flex justify-center mx-auto  bg-orange-200 text-white  p-2 rounded-md  self-end"
              : "flex justify-center mx-auto  bg-orange-500 text-white p-2 rounded-md  self-end"
          }
          onClick={handleCheckout}
          disabled={disabled}
        >
          ЗАКАЗАТЬ
        </button>
      </div>
    </div>
  );
};

export default CartPage;
