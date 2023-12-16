import prisma from "@/utils/connect";
import { NextResponse } from "next/server"


//выводим категории
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany()
        return new NextResponse(
            JSON.stringify(categories),
            { status: 200 })
    } catch (error) {
        console.log(error);

        return new NextResponse(
            JSON.stringify({ message: "Что-то пошло не так (" }),
            { status: 500 })
    }
}
export const POST = () => {
    return new NextResponse("hello", { status: 200 })
}