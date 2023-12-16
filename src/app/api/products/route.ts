import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"


//получаем все продукты из API
export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)
    const cat = searchParams.get("cat")

    try {
        const products = await prisma.product.findMany({
            where: {
                ...(cat ? { catSlug: cat } : null),
              },
        })
        return new NextResponse(
            JSON.stringify(products),
            { status: 200 })
    } catch (error) {
        console.log(error);

        return new NextResponse(
            JSON.stringify({ message: "Что-то пошло не так (" }),
            { status: 500 })
    }
}
//добавляем продукты в API
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const product = await prisma.product.create({
          data: body,
        });
        return new NextResponse(JSON.stringify(product), { status: 201 });
      } catch (err) {
        console.log(err);
        return new NextResponse(
          JSON.stringify({ message: "Что-то пошло не так!" }),
          { status: 500 }
        );
      }
}

