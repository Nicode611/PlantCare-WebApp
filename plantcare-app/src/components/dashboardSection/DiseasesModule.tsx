"use client"

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// CSS
import "@/styles/diseaseModule.css"

// Session
import { useSession } from 'next-auth/react';

// Components
import DiseaseCard from "../DiseaseCard"
import UnselectedPlant from "../fallbacks/UnselectedPlant";

// Types
import { Disease } from "@/types/disease";

// API
import { getDiseasesFromPlantModel } from "@/lib/api";

function DiseasesModule() {
    const { data: session } = useSession();
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value)
    const [diseases, setDiseases] = useState<Disease[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)


    useEffect(() => {
        const getDiseases = async () => {
            if (selectedPlant === null) return
            setIsLoading(true)
            try {
                const diseases = await getDiseasesFromPlantModel(selectedPlant.modelId)
                setDiseases(diseases)
                setIsLoading(false)
            } catch (error) {
                console.error("Erreur lors de la récupération des diseases :", error)
                setIsLoading(false)
            }
        }
        getDiseases()
    }, [selectedPlant])

    // If no plant selected
    if (!selectedPlant) return (<div className={`h-full ${session?.user.theme === "light" ? "bg-white text-black" : "bg-bgDarkSection text-white" }`}><UnselectedPlant/></div>)
    if (isLoading) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${session?.user.theme === "light" ? "bg-[#F9FAFB] text-primary" : "bg-bgDarkSection text-white" }`}>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-[#87b57d] border-solid rounded-full border-t-transparent animate-spin"></div>
            <p className="mt-4 text-lg font-medium">Chargement...</p>
          </div>
        </div>
      )
    }


    return (
        <div className="w-full h-full flex flex-col items-start overflow-hidden">
            <div className={`w-full h-[50px] flex items-center justify-start border-b border-gray-200 ${session?.user.theme === "light" ? "bg-white text-primary" : "bg-black text-white" }`}>
              <h3 className="text-2xl font-bold py-1 px-3">Possible diseases</h3>
            </div>
            <div className={`w-full h-full flex flex-col md:flex-row items-center justify-around space-x-10 p-3 overflow-x-auto ${session?.user.theme === "light" ? "bg-[#F9FAFB]" : "bg-bgDarkSection" }`}>
              { diseases.map((disease, index) => {
                  return <DiseaseCard
                   key={index}  
                   diseaseName={disease.name} 
                   diseaseDescription={disease.description} 
                   diseaseSeverity={disease.severity} 
                   diseaseTreatment={disease.treatment} 
                   diseaseImage={disease.image} 
                  />
              })}
            </div>
        </div>
    )
}

export default DiseasesModule
