"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { select } from "@/redux/slices/plants/selectPlantSlice"
import EmptyDrop from "@/images/droplet-black.png";
import FullDrop from "@/images/droplet-blue.png";

// Components
import UnselectedPlant from "../fallbacks/UnselectedPlant";

// API
import { updateWaterLvl } from "@/lib/api";
import { updateNextWateringDate } from "@/lib/api/plants";
import { updateSeverityLevelFromPlant } from "@/lib/api";

// Types
import { Plant } from "@/types/plant";

function CaringModule() {
    const dispatch = useDispatch();
    const [plant, setPlant] = useState<Plant | null>(null);
    const selectPlant = useSelector((state: RootState) => state.selectPlant.value);

  // Récupère la plante dès que l'ID est disponible
  useEffect(() => {
    if (selectPlant !== null) {
      setPlant(selectPlant)
    }
  }, [selectPlant]);

  // Met à jour le niveau d'eau et l'état local
  const handleWatering = () => {
    if (plant?.id !== undefined) {
        const actualDate = new Date();
        updateWaterLvl(plant.id, actualDate);
        updateNextWateringDate(plant.id);
        updateSeverityLevelFromPlant(plant.id.toString(), "L");
        const updatedPlant = { 
            ...plant, 
            actualWaterLvl: 100, 
            lastWateredAt: actualDate.toISOString() // maintenant c'est une chaîne
        };
        setPlant(updatedPlant);
        dispatch(select(updatedPlant));
    }
  };

    // If no plant selected
    if (!plant) return (<UnselectedPlant/>); 

    return (
        
        <div className="w-full h-full flex flex-col">
        <div className="h-[10%] p-2 flex justify-center items-center">
            <h2 className="font-sans font-bold text-[1.9rem] whitespace-nowrap truncate mr-3">{plant.model.name}</h2>
            <div>{plant.location}</div>
        </div>
        <div className="flex flex-col h-full p-3">
            <div className="relative w-full h-[80%]">
                <Image src={`/images/plants-img/${plant.model.image}.png`} alt="Plant" fill sizes="max-width: 100%; max-height: 100%;" style={{ objectFit: "contain" }} />
                <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-1">
                    {Array.from({ length: 5 }, (_, i) => (
                    <Image key={i} src={EmptyDrop} alt="Empty drop" width={20} height={20} />
                    ))}
                </div>
                <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-10">
                    {Array.from({ length: plant.model.waterLvlNeeded || 0 }, (_, i) => (
                    <Image key={i} src={FullDrop} alt="Full drop" width={20} height={20} />
                    ))}
                </div>
            </div>
            <div className="w-full h-[20%] p-3">
                <div className="w-full h-full flex justify-center items-center bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 shadow-sm rounded-md">
                    <div className="flex items-end w-full h-5 bg-gray-100 m-5 p-1 rounded-full border border-b">
                        <div
                            className="h-full bg-water rounded-full"
                            style={{ width: `${plant.actualWaterLvl || 0}%`, transition: "width 0.5s ease-out" }}
                        ></div>
                    </div>
                    <div className="w-[80px]">
                        <button
                            className="w-auto p-1 bg-water rounded-lg text-white active:shadow-activeButton"
                            onClick={handleWatering}
                        >
                            <span className="liquid"></span>
                            <span className="btn-txt text-sm pl-1 pr-1">Water</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default CaringModule;