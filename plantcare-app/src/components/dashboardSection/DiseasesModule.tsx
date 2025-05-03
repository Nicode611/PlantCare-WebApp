"use client"

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


// CSS
import "@/styles/diseaseModule.css"

// Components
import DiseaseCard from "../DiseaseCard"

// Types
import { Disease } from "@/types/disease";

// API
import { getDiseasesFromPlantModel } from "@/lib/api";

function DiseasesModule() {
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const [diseases, setDiseases] = useState<Disease[]>([])


    useEffect(()=> {
        const getDiseases = async () => {
                if (selectedPlant === null) return;
                try {
                    const diseases = await getDiseasesFromPlantModel(selectedPlant.modelId);
                    setDiseases(diseases);
                } catch (error) {
                    console.error("Erreur lors de la récupération des diseases :", error);
                }
            }

        getDiseases();
    }, [selectedPlant])




    return (
      <>
        <style jsx global>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .diseases-container {
            opacity: 0;
            animation: fadeInUp 0.5s ease-out forwards;
          }
        `}</style>
        <div className="diseases-container w-full h-full flex items-center p-5">
            { diseases.map((disease, index) => {
                return <DiseaseCard
                 key={index}  diseaseName={disease.name} diseaseDescription={disease.description} diseaseSeverity={disease.severity} diseaseTreatment={disease.treatment} diseaseImage={disease.image} />
            })}
        </div>
      </>
    )
}

export default DiseasesModule
