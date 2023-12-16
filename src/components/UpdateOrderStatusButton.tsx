"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const UpdateOrderStatusButton = () => {
    const route = useRouter()
    function product(){
        route.push("/orders")
    }
  return (
    <button onClick={product}  className="flex mx-auto mr-4 bg-orange-500 text-white p-2 rounded-md  ">Изменить статус/удалить</button>
  )
}

export default UpdateOrderStatusButton
