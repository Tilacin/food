import prisma from "@/utils/connect"
import { NextResponse } from "next/server"
import { hash } from 'bcrypt'
import * as z from 'zod'

//определяем схему для проверки входных данных
const userSchema = z
    .object({
        username: z.string().min(1, "Требуется имя пользователя").max(30),
        email: z
            .string()
            .min(1, "Требуется электронная почта")
            .email("Неверный адрес электронной почты"),
        password: z
            .string()
            .min(1, "Требуется пароль")
            .min(8, "Пароль должен содержать более 8 символов"),

    })

export async function POST(req: Request) {
   
    try {
        const body = await req.json()
        const { email, username, password } = userSchema.parse(body)

        //проверяем есть ли уже такой email
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Пользователь с таким email уже существует" }, { status: 409 })
        }

        //проверяем есть ли уже такой пользователь
        const existingUserByUsername = await prisma.user.findUnique({
            where: { username: username }
        })
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: "Пользователь с таким username уже существует" }, { status: 409 })
        }

        const hashedPassword = await hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "Пользователь успешно создан" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Что-то пошло не так при авторизации" }, { status: 500 })
    }
}