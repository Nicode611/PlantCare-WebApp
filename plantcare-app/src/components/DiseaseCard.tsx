import "@/styles/diseaseCard.css"

import Image from "next/image";

// Components
import DiseaseModal from "./modals/diseaseInfosModal";

// Redux
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { open } from "@/redux/slices/modalSlice";

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

    const dispatch = useDispatch();
    const { activeModal, modalProps } = useSelector((state: RootState) => state.modal);
    // Expect diseaseName as prop key
    const selectedName = (modalProps as { diseaseName?: string }).diseaseName;
    const modalState = activeModal === "disease" && selectedName === diseaseName;

    
    const handleOpenModal = () => {
        dispatch(open({ modal: "disease", props: { diseaseName } }));
    };

    const disease: Disease = {
        name: diseaseName,
        description: diseaseDescription,
        severity: diseaseSeverity,
        treatment: diseaseTreatment,
        image : diseaseImage
    }

    return (
        <>
          {modalState && (
            <DiseaseModal
              name={disease.name}
              imageSrc={disease.image}
              severity={disease.severity}
              description={disease.description}
              treatment={disease.treatment}
            />
          )}
          <div className="w-[250px] min-w-[200px] h-full mr-[35px] bg-white rounded-lg hover:cursor-pointer " onClick={()=> {handleOpenModal()}}>
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
                  <button
                    onClick={handleOpenModal}
                    className="flex items-center bg-[#b8f7c1] text-[#277a1c] text-[0.7rem] font-bold rounded-full w-auto pl-1 pr-2 m-2 active:bg-[#277a1c] active:text-[#b8f7c1]"
                  >
                    <Info className="h-[0.8rem]" strokeWidth={1.75} />
                    Treatment
                  </button>
              </div>
          </div>
        </>
    )
}

export default DiseaseCard
