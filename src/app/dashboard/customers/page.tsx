import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

const customers = async () => {
  let allUsers = await prisma.user.findMany();
  let allOrders = await prisma.order.findMany();
  const session = await getServerSession(authOptions);

  if (session?.user.isAdmin) {
    return (
      <div className="bg-gray-100 min-h-screen w-full">
        <div className="flex justify-between p-4">
          <h2>Клиенты</h2>
          <h2>С возвращением, админ!</h2>
        </div>
        <div className="p-4">
          <div className=" m-auto p-4 border rounded-lg bg-white overflow-y-auto">
            <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
              <span>Имя</span>
              <span className="sm:text-left text-right">Email</span>
              {/* <span className="hidden md:grid">Последний заказ</span>
              <span className="hidden sm:grid">Всего заказов</span> */}
            </div>
            <ul>
              {allUsers.map((user, id) => (
                <li
                  key={id}
                  className=" bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <BsPersonFill className="text-purple-800" />
                    </div>
                    <p className="pl-4">{user.name || user.username}</p>
                  </div>
                  <p className="text-gray-600 sm:text-left text-right">
                    {user.email}
                  </p>
                  {/* <p className="hidden md:flex">покупки</p>
                  <div className="sm:flex hidden justify-between items-center">
                    <p>Количество заказов</p>
                    <BsThreeDotsVertical />
                  </div> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/sign-in");
    
  }
};

export default customers;
