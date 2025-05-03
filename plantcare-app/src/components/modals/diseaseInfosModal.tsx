"use client";

import Image from "next/image"
import { createPortal } from "react-dom";
import { useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { close } from "@/redux/slices/modalSlice"

// Lucide
import { Circle } from "lucide-react";

interface DiseaseModalProps {
  name: string;
  imageSrc: string;
  severity: number;
  description: string;
  treatment: string;
}

export default function DiseaseModal({
  name,
  imageSrc,
  severity,
  description,
  treatment,
}: DiseaseModalProps) {


    const [isClosing, setIsClosing] = useState(false);
    const dispatch = useDispatch();
    const handleCloseModal = () => {
        setIsClosing(true);
    }

    return createPortal(
    <>
      <style jsx global>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOutScale {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(0.95); }
        }
      `}</style>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-lg flex items-center justify-center z-[9999]">
        {/* Modal */}
        <div
          className="relative w-full max-w-2xl mx-auto bg-gray-200/60 rounded-lg shadow-lg p-5"
          style={{
            animation: `${isClosing ? 'fadeOutScale 0.3s ease-in forwards' : 'fadeInScale 0.3s ease-out forwards'}`
          }}
          onAnimationEnd={() => {
            if (isClosing) {
              dispatch(close());
            }
          }}
        >
          {/* Close button */}
          <button className="absolute top-4 right-6 text-4xl font-bold" onClick={()=> {handleCloseModal()}}>&times;</button>
      
              {/* Upper section */}
              <div className="flex w-full mb-4 md:mb-0">
                  <div className="overflow-hidden w-2/5">
                      {/* Image */}
                      <Image
                          src={`/images/diseases-img/${imageSrc}.png`}
                          alt="Feuilles vertes" 
                          width={500}
                          height={500}
                          priority
                          className="w-full h-40 object-cover rounded-lg "
                      />
                      {/* Severity */}
                      <div className="flex items-center mt-6">
                          <p className="font-bold mr-2">
                              Sévérité : 
                          </p>
                          {Array.from({ length: severity }).map((_, i) => {
                              let color;
                              if (severity === 3) color = "red";
                              else if (severity === 2) color = "orange";
                              else if (severity === 1) color = "green";

                              return <Circle key={i} className="h-2 w-2 mr-1 ml-[2px] fill-current" style={{color }} />;
                          })}
                      </div>
                  </div>
      
                  {/* Title description */}
                  <div className="w-3/5 md:pl-6">
                      <h1 className="text-5xl font-bold mb-4">{name}</h1>
                      <p className="">{description}</p>
                  </div>
              </div>
              
              
              {/* Bottom section */}
              <div className="w-full mt-4 md:mt-0">
                  <div className="mt-4">
                      <p className="text-xl font-bold mb-2">Treatment :</p>
                      <p className="text-base">{treatment}</p>
                  </div>
              </div>
          </div>
        </div>
    </>,
    document.body
  );
}
