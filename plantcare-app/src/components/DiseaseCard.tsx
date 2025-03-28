import "@/styles/diseaseCard.css"

import Image from "next/image";

// Types
import { Disease } from "@/types/disease";

// Lucide
import { Circle } from "lucide-react";
import { Info } from "lucide-react";

interface DiseaseCardProps {
  diseaseName: string;
  diseaseDescription: string;
  diseaseSeverity: number;
  diseaseTreatment: string;
  diseaseImage: string;
}

function DiseaseCard({ diseaseName, diseaseDescription, diseaseSeverity, diseaseTreatment, diseaseImage }: DiseaseCardProps) {

    const disease: Disease = {
        name: diseaseName,
        description: diseaseDescription,
        severity: diseaseSeverity,
        treatment: diseaseTreatment,
        image : diseaseImage
    }

    return (
        <div className="w-[250px] min-w-[200px] h-full mr-[35px] bg-white rounded-lg hover:cursor-pointer ">
            <div className="h-[80%]">
                <div className="relative h-[55%] w-full">
                    <Image
                        src={`/images/diseases-img/${diseaseImage}.png`}
                        alt="Plant Disease"
                        fill
                        sizes="max-width: 100%; max-height: 100%;"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="h-[45%] p-3">
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {disease.name}
                    </div>
                    <div className="flex items-center whitespace-nowrap overflow-hidden">
                        <span className="mr-2 text-sm">Severity :</span>
                        {Array.from({ length: disease.severity }).map((_, i) => {
                            let color;
                            if (disease.severity === 3) color = "red";
                            else if (disease.severity === 2) color = "orange";
                            else if (disease.severity === 1) color = "green";

                            return <Circle key={i} className="h-2 w-2 ml-[2px] fill-current" style={{color }} />;
                        })}
                    </div>
                </div>
            </div>
            <div className="h-[20%] flex justify-end">
                <button className="flex items-center bg-[#b8f7c1] text-[#277a1c] text-[0.7rem] font-bold rounded-full w-auto pl-1 pr-2 m-2 active:bg-[#277a1c] active:text-[#b8f7c1]">
                <Info className="h-[0.8rem]" strokeWidth={1.75} />
                    Treament
                </button>
            </div>
        </div>
    )
}

export default DiseaseCard
