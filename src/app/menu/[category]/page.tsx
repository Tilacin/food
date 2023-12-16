
import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

//все продукты в одной категории

const getData = async (category:string)=>{
  const res = await fetch(`http://localhost:3000/api/products?cat=${category}`,{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
    
  }

  return res.json()
}

type Props = {
  params:{category:string}
}

const CategoryPage = async({params}:Props) => {
  const products:ProductType[] = await getData(params.category)
  return (
   
    <div className="h-full  flex flex-wrap  items-center justify-center  bg-amber-200 p-5 gap-4 ">
      {products.map((item) => (
        <Link className=" bg-orange-50 relative m-4 p-2 border border-gray-200 rounded-3xl shadow-sm  h-[25rem] shadow-neutral-200 hover:scale-105 hover:shadow-2xl hover:-translate-y-5 transition duration-300 hover:border-2 max-sm:w-screen sm:w-[80%] md:w-1/3 lg:w-1/3 xl:w-1/4 max-xl:w-1/5 text-amber-400 hover:text-orange-400" href={`/product/${item.id}`} key={item.id}>
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain"/>
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2    ">{item.title}</h1>
            <h2 className="group-hover:hidden text-xl ">${item.price}</h2>
            
          </div>
        </Link>
      ))}
    </div>
   
  );
};

export default CategoryPage;