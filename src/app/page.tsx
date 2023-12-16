import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="bg-amber-400 ">
        <div className="w-full ">
          <div className="bg-black flex  flex-wrap max-[650px]:flex-col ">
          <div>
            <Link className={buttonVariants()} href="/dashboard">
              Перейти в админку
            </Link>
          </div>
            <div className="w-1/2  max-[650px]:w-full mt-8 text-center ">
              <div className="flex flex-wrap items-center justify-center">
                <h1 className="text-5xl font-bold text-yellow-400 ">
                  CulinArt
                </h1>
                <div className="flex  pl-2">
                  <Image src="/line.png" alt="" width={305} height={96} />
                </div>
              </div>

              <p className=" text-2xl  text-white">
                готовим искусство, вы наслаждаетесь результатом!
              </p>
              <div className="flex  flex-col gap-6 text-xl text-black font-bold  my-20  min-[1100px]:text-2xl ">
                <h1 className="text-white">
                  Приготовим и доставим в любую точку города Ростова-на-Дону
                </h1>
                <div className="flex max-[575px]:justify-center ">
                  <p className="bg-amber-400 w-max py-4 px-6 border rounded-lg ">
                    Зарегистрируйтесь
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <p className="bg-amber-400 w-max border rounded-lg py-4 px-6 ">
                    Оформите заказ
                  </p>
                </div>
                <div className="flex justify-end max-[575px]:justify-center">
                  <p className="bg-amber-400 w-max border rounded-lg py-4 px-6">
                    Ожидайте курьера
                  </p>
                </div>
              </div>
            </div>

            <div className=" w-1/2 max-[650px]:w-4/5 ">
              <Image src="/delivery.png" alt="" width={500} height={500} />
            </div>
          </div>
          
          <div className="flex ">
            <Image src="/main_food.png" alt="" width={600} height={764} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

  
