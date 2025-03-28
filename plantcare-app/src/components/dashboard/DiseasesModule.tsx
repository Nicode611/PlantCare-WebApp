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
    const [diseases, setDiseases] = useState<Disease[]>([])

    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);

    

    const getDiseases = async () => {
        if (selectedPlant === null) return;
        try {
            const diseases = await getDiseasesFromPlantModel(selectedPlant.modelId);
            setDiseases(diseases);
        } catch (error) {
            console.error("Erreur lors de la récupération des diseases :", error);
        }
    }

    useEffect(()=> {
        getDiseases();
    }, [selectedPlant])



    return (
        <div className="w-full h-full flex items-center p-5">
            { diseases.map((disease, index) => {
                return <DiseaseCard key={index} diseaseName={disease.name} diseaseDescription={disease.description} diseaseSeverity={disease.severity} diseaseTreatment={disease.treatment} diseaseImage={disease.image} />
            })}
        </div>
    )
}

export default DiseasesModule
