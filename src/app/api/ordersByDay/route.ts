import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const ordersByDay = async (req: NextRequest, res: NextResponse) => {
    try {
      let startDate = new Date(); // Получаем текущую дату
      let endDate = new Date(); // Текущая дата будет концом периода
      startDate.setDate(startDate.getDate() - startDate.getDay()); // Устанавливаем начало периода на начало текущей недели
      endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Устанавливаем конец периода на конец текущей недели
  
      // Получаем все заказы только для текущей недели
      let weeklyOrders = await prisma.order.findMany({
        where: {
          AND: [
            {
              createdAt: {
                gte: startDate.toISOString(), // Больше или равно началу недели
              },
            },
            {
              createdAt: {
                lte: endDate.toISOString(), // Меньше или равно концу недели
              },
            },
          ],
        },
      });
  
      const ordersDay:  Record<string, any[]> = {
        "Пн": [],
        "Вт": [],
        "Ср": [],
        "Чт": [],
        "Пт": [],
        "Сб": [],
        "Вс": [],
      };
  
      // Распределение заказов по дням недели
      weeklyOrders.forEach((order) => {
        const orderDate = new Date(order.createdAt);
        const dayIndex = orderDate.getDay(); // Получаем день недели (0 - Воскресенье, 1 - Понедельник, и т.д.)
        const dayOfWeek = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][dayIndex]; // Преобразуем индекс дня недели в название
        ordersDay[dayOfWeek].push(order); // Добавляем заказ в соответствующий массив дня недели
      });
  
      return new NextResponse(JSON.stringify(ordersDay), { status: 200 });
    } catch (err) {
        console.log(err);
        return new NextResponse(
          JSON.stringify({ message: "Что-то пошло не так!" }),
          { status: 500 }
        );
      }
  };
  
  export default ordersByDay;
  