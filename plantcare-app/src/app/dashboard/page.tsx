"use client";

import PlantsCaroussel from "../../components/PlantsCaroussel"
import Calendar from "../../components/Calendar"
import PrimaryButton from "../../components/PrimaryButton"
import PlantDecease from "../../components/sections/PlantsDiseases"
import Image from "next/image";
import PlantImg from "../../images/plant-test.png"
import BgPlant from "../../images/Background-Illustration.png"


export default function Dashboard() {
  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100 relative overflow-x-hidden">
        

        

        <div className="flex justify-between w-[100%] z-[100]">
            <div className="flex flex-col justify-end items-start w-[60%] ml-5">
                <div className="border-2 border-red-100 rounded-md p-2 flex justify-center items-center bg-black">
                    <h2>TO</h2>
                    <a href="../" className="text-green-800">Home</a>
                    <a href="../settings" className="text-gray-500">Settings</a>
                </div>
                <Calendar></Calendar>
            </div>

            <div className="relative flex flex-col justify-between items-end w-[40%] pt-4">
                <div className="flex justify-between items-center w-full">
                    <PrimaryButton title={"Add plant"}></PrimaryButton>
                    <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                </div>
                <PlantsCaroussel></PlantsCaroussel>

                <div className="bg-[#236814] !bg-opacity-[32%] h-[450px]  w-[110%] absolute top-0 right-0 z-0"
                style={{ clipPath: "ellipse(100% 100% at 100% 0%)"}}></div>
                <div className="bg-[#236814] !bg-opacity-[8%] h-[550px]  w-[130%] absolute top-0 right-0 z-0"
                style={{ clipPath: "ellipse(100% 100% at 100% 0%)"}}></div>
            </div>
        </div>
            
            
        <div className="w-[100%] flex justify-between items-center mt-24">
            <div className="w-[50%] h-full justify-start items-center max-w-[540px] relative">
                <div className="w-[100%] h-[500px]">
                    <Image
                        src={PlantImg}
                        alt="Plant Image"
                        fill
                        className="object-contain z-50"
                    />
                </div>
                <div className="absolute left-0 bottom-[-100px] w-[100%] h-[630px] bg-[#236814] bg-opacity-[55%]"
                style={{ clipPath: "ellipse(100% 50% at 0% 50%)"}}></div>
            </div>
            <div className="w-[50%]   flex-grow">
                <div className="max-w-[500px] flex flex-col justify-center items-start text-black pl-5">
                    <div className="flex justify-between items-center w-[100%]">
                        <h3 className="text-[2rem] font-extrabold">Plant name</h3>
                        <PrimaryButton title={"Plant settings"}></PrimaryButton>
                    </div>
                   
                    <div>
                        <p className="m-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>
                    <span>Water frequency</span>
                    <div className="flex justify-between">
                        <button>Watering</button>
                        <div>Dropplets</div>
                    </div>
                </div>
            </div>
            
        </div>
            
        <div className="relative flex justify-center w-[100%] mt-48">
            <PlantDecease></PlantDecease>
            <div className="absolute bottom-0 right-[-15rem] w-[1000px] h-[1000px] flex justify-center items-center z-0">
                <Image
                src={BgPlant}
                alt="Plant Image"
                fill
                className="object-contain z-0"
                    style={{ mixBlendMode: "multiply", transform: "scaleX(-1)" }}
                />
            </div>
        </div>
    </div>
  )
}
