import prisma from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

import { NextRequest, NextResponse } from "next/server";
      //ИДЕНТИФИКАТОР ПРОДУКТА

// получаем продукт 

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Что-то пошло не так!" }),
      { status: 500 }
    );
  }
};

// удаляем продукт
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const session = await getAuthSession();
//если админ, можем удалить продукт (на странице самого блюда)
  if (session?.user.isAdmin) {
    try {
      await prisma.product.delete({
        where: {
          id: id,
        },
      });

      return new NextResponse(JSON.stringify("Продукт был удален!"), {
        status: 200,
      });
      
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Что-то пошло не так!" }),
        { status: 500 }
      );
    }
  }//если не админ
  return new NextResponse(JSON.stringify({ message: "Вам это запрещено!" }), {
    status: 403,
  });
};