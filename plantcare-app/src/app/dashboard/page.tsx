"use client";

import PlantsCaroussel from "../../components/PlantsCaroussel"
import Calendar from "../../components/Calendar"

export default function Dashboard() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100 relative">
        <div className="bg-green-800 bg-opacity-30 rounded-full h-[50rem] w-[50rem] absolute top-[-22rem] right-[-22rem] -z-0"></div>
        <div className="bg-green-800 bg-opacity-15 rounded-full h-[60rem] w-[60rem] absolute top-[-25rem] right-[-25rem] -z-0"></div>

        <svg className="w-[70rem] h-[45rem] bottom-[-10rem] left-[-35rem] absolute">
            <defs>
                <filter id="shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="black" floodOpacity="0.5"/>
                </filter>
            </defs>

            <ellipse cx="50%" cy="50%" rx="50%" ry="50%" className="fill-green-800 opacity-70" filter="url(#shadow)"/>
        </svg>


        <div className="flex flex-col">
            <Calendar></Calendar>

            <PlantsCaroussel></PlantsCaroussel>
    
            <div className="border-2 border-red-100 rounded-md p-2 flex flex-col justify-center items-center bg-black">
                <h2>TO</h2>
                <a href="../" className="text-green-800">Home</a>
                <a href="../settings" className="text-gray-500">Settings</a>
            </div>
        </div>
    </div>
  )
}
