"use client";

// Image
import Image from "next/image";
import EmptyDrop from "@/images/droplet-black.png";
import FullDrop from "@/images/droplet-blue.png";

// Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { select } from "@/redux/slices/plants/selectPlantSlice"
import { updatePlant } from "@/redux/slices/plants/allThePlantsSlice";

// Session
import { useSession } from 'next-auth/react';

// Components
import UnselectedPlant from "../fallbacks/UnselectedPlant";

// Lucide 
import { MapPin } from "lucide-react";

// API
import { updateWaterLvl } from "@/lib/api";
import { updateNextWateringDate } from "@/lib/api/plants";
import { updateSeverityLevelFromPlant } from "@/lib/api";

function CaringModule() {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const selectPlant = useSelector((state: RootState) => state.selectPlant.value);


  // Met à jour le niveau d'eau et l'état redux
  const handleWatering = () => {
    if (selectPlant?.id !== undefined) {
        const actualDate = new Date();
        updateWaterLvl(selectPlant.id, actualDate);
        updateNextWateringDate(selectPlant.id);
        updateSeverityLevelFromPlant(selectPlant.id.toString(), "L");
        const updatedPlant = { 
            ...selectPlant, 
            actualWaterLvl: 100, 
            lastWateredAt: actualDate.toISOString() // maintenant c'est une chaîne
        };
        dispatch(updatePlant({
          id: selectPlant.id,
          changes: {
            actualWaterLvl: 100,
            lastWateredAt: actualDate.toISOString(),
          },
        }));
        dispatch(select(updatedPlant));
    }
  };

    // If no plant selected
    if (!selectPlant) return (<UnselectedPlant/>); 

    return (
        
        <div className="w-full h-full flex flex-col">
          <div className={`w-full flex items-center justify-start ${session?.user.theme === "light" ? "bg-white border-b border-gray-200" : "bg-black" } `}>
            <h3 className="text-primary text-2xl font-bold py-1 px-3">Your plant</h3>
          </div>
          <div className={`w-full h-full flex flex-col ${session?.user.theme === "light" ? "bg-[#F9FAFB]" : "bg-bgDarkSection" }  overflow-hidden`}>
            <div className="p-2 flex flex-col justify-center items-start">
                <span className="font-sans font-bold text-2xl whitespace-nowrap truncate mr-3">{selectPlant.model.name}</span>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="w-4" color="#277A1C"></MapPin>
                  <span className="text-xs">{selectPlant.location}</span>
                </div>
            </div>
            <div className="flex flex-col h-full p-3 pt-0">
                <div className="flex justify-center relative w-full h-full">
                      <Image 
                        src={selectPlant.image !== null ? selectPlant.image : `/images/plants-img/${selectPlant.model.image}.png`} 
                        alt={selectPlant.model.name}
                        fill
                        className="h-auto rounded-lg" 
                        style={selectPlant.image !== null ? { objectFit: "cover" } : { objectFit: "contain" }} 
                      />
                    <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-1">
                        {Array.from({ length: 5 }, (_, i) => (
                        <Image key={i} src={EmptyDrop} alt="Empty drop" width={20} height={20} />
                        ))}
                    </div>
                    <div className="absolute flex justify-start w-[100px] right-0 bottom-3 z-10">
                        {Array.from({ length: selectPlant.model.waterLvlNeeded || 0 }, (_, i) => (
                        <Image key={i} src={FullDrop} alt="Full drop" width={20} height={20} />
                        ))}
                    </div>
                </div>
                <div className="w-full p-1">
                    <div className="w-full h-full flex justify-center items-center bg-[#bcbcbc] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 shadow-md rounded-lg" title={`Water level: ${selectPlant.actualWaterLvl || 0}%`}>
                        <div className="flex items-end w-full h-5 bg-gray-100 m-5 p-1 rounded-full border border-b">
                            <div
                                className="h-full bg-water rounded-full"
                                style={{ width: `${selectPlant.actualWaterLvl || 0}%`, transition: "width 0.5s ease-out" }}
                            ></div>
                        </div>
                        <div className="w-[80px]">
                            <button
                                className="w-auto p-1 bg-water rounded-lg text-white active:shadow-activeButton"
                                onClick={handleWatering}
                            >
                                <span className="liquid"></span>
                                <span className="btn-txt text-sm p-1">Water</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    );
}

export default CaringModule;