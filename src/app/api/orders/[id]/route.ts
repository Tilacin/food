import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


// ИЗМЕНИТЬ СТАТУС ЗАКАЗА
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });
    return new NextResponse(
      JSON.stringify({ message: "Заказ был обновлен!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Что-то пошло не так!" }),
      { status: 500 }
    );
  }
};