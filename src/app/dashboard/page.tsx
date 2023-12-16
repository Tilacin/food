import RecentOrders from "@/components/RecentOrders";
import BarChart from "@/components/BarChart";

import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";








export default async function Page() {
 
  const session = await getServerSession(authOptions);
  if (session?.user.isAdmin) {
    return (
      <>
        <Head>
          <p className="flex ">Панель мониторинга</p>
        </Head>
        <main className="flex flex-col bg-gray-100  w-[90%]   p-2">
        

          <div className="flex  flex-col">
            <BarChart/>
            <RecentOrders />
          </div>
        </main>
      </>
    );
  } else {
    redirect("/sign-in");
  }
}

