"use client";

import FileUploader from "@/components/Uploader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Inputs = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};

const AddPage = () => {
  const [imageUrl, setImageUrl] = useState("/images/placeholder-image.jpg");
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  

  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/");
  }
  //при вводе данных в любом поле, обновляем состояние
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

 

  

  //отправляем данные в API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const url = imageUrl
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify({
          img: url,
          ...inputs,
        }),
      });
  
      const data = await res.json();
  
      router.push(`/product/${data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center text-amber-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        <h1 className="text-4xl mb-2 text-gray-300 font-bold">
          Добавить новый продукт
        </h1>
        <div >
        
  <FileUploader imageUrl={imageUrl} setImageUrl={setImageUrl}/>
 
  
</div>
       
        <div className="w-full flex flex-col gap-2 ">
        
          <label className="text-sm">Название</label>
          <input
            className="ring-1 ring-orange-200 p-4 rounded-sm placeholder:text-orange-200 outline-none"
            type="text"
            placeholder="суп"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Описание</label>
          <textarea
            rows={3}
            className="ring-1 ring-orange-200 p-4 rounded-sm placeholder:text-orange-200 outline-none"
            placeholder="описание продукта"
            name="desc"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Цена</label>
          <input
            className="ring-1 ring-orange-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Категории</label>
          <input
            className="ring-1 ring-orange-200 p-4 rounded-sm placeholder:text-orange-200 outline-none"
            type="text"
            placeholder="first_dishes или second_dishes или drinks или desserts"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        
        <button
          type="submit"
          className="bg-orange-500 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Добавить
        </button>
      </form>
    </div>
  );
};

export default AddPage;