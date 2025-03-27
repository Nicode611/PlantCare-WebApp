"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import EmptyDrop from "@/images/droplet-black.png";
import FullDrop from "@/images/droplet-blue.png";

// API
import { getSpecificPlant, updateWaterLvl } from "@/lib/api";

// Types
import { Plant } from "@/types/plant";

function CaringModule() {
  const [plant, setPlant] = useState<Plant | null>(null);
  const selectedPlantId = useSelector((state: RootState) => state.selectPlant.value);

  // Récupère la plante dès que l'ID est disponible
  useEffect(() => {
    if (selectedPlantId !== null) {
      getSpecificPlant(selectedPlantId).then((data) => {
        if (data) setPlant(data);
      });
    }
  }, [selectedPlantId]);

  // Met à jour le niveau d'eau et l'état local
  const handleWatering = () => {
    if (plant?.id !== undefined) {
      updateWaterLvl(plant.id);
      setPlant({ ...plant, actualWaterLvl: 100 });
    }
  };

  // Affiche rien tant que la plante n'est pas chargée
  if (!plant) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[10%] flex justify-center items-center">
        <h2 className="font-sans font-bold text-[1.9rem] mr-3">{plant.model.name}</h2>
        <div>{plant.location}</div>
      </div>
      <div className="flex h-full p-3">
        <div className="relative w-3/5">
          <Image src={`/images/plants-img/${plant.model.image}.png`} alt="Plant" fill objectFit="contain" />
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
        <div className="w-2/5 p-3">
          <div className="w-full h-full flex flex-col justify-center items-center bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 shadow-sm rounded-md">
            <div className="flex items-end w-5 h-3/5 bg-gray-100 m-5 p-1 rounded-full border border-b">
              <div
                className="w-full bg-water rounded-full"
                style={{ height: `${plant.actualWaterLvl || 0}%`, transition: "height 0.5s ease-out" }}
              ></div>
            </div>
            <div className="w-[80px]">
              <button
                className="w-full p-2 bg-water rounded-lg text-white active:shadow-activeButton"
                onClick={handleWatering}
              >
                <span className="liquid"></span>
                <span className="btn-txt">Water</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaringModule;