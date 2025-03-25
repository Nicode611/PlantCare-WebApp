"use client"

// Next
import Image from "next/image"

// Redux
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store";

// Image
import PlantImg from "@/images/plant-card.png"
import EmptyDrop from "@/images/droplet-black.png"
import FullDrop from "@/images/droplet-blue.png"

// Components
import WaterButton from "../WaterButton"

function CaringModule() {
    const selectedPlantId = useSelector((state: RootState) => state.selectPlant.value);


    

    /* const plant = "/../../images/plant-card.png"; */

    const waterLvl = 23;
    const waterNeeded = 3;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[10%] flex justify-center items-center">
                <h2 className="font-sans font-bold text-[1.9rem] mr-3">{selectedPlantId}</h2>
                <div>Lounge</div>
            </div>
            <div className="flex h-full p-3">
                <div className="relative w-3/5 ">
                    <Image
                    src={PlantImg}
                    alt="Plant"
                    fill
                    objectFit="contain"
                    />
                    <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-1">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Image
                            key={i}
                            src={EmptyDrop}
                            alt="Empty drop"
                            width={20}
                            height={20}
                            />
                        ))}
                    </div>
                    <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-10">
                        {Array.from({ length: waterNeeded }, (_, i) => (
                            <Image
                            key={i}
                            src={FullDrop}
                            alt="Full drop"
                            width={20}
                            height={20}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-2/5 p-3">
                    <div className="w-full h-full flex flex-col justify-center items-center bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 shadow-sm rounded-md">
                        <div className="flex items-end w-5 h-3/5 bg-gray-100 m-5 p-1 rounded-full border border-b">
                            <div className="w-full bg-water rounded-full" style={{ height: `${waterLvl}%` }}></div>
                        </div>
                        <WaterButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaringModule
