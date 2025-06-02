"use client";

// Redux 
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { select } from "@/redux/slices/plants/selectPlantSlice";

// Session
/* import { useSession } from "next-auth/react"; */


// Caroussel
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import "swiper/css/effect-coverflow"
import "../styles/plantsCaroussel.css"
import { Navigation, A11y, Grid, FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

// Image

import Image from "next/image";
import React, { useState } from "react";
// PlantImage component
type PlantImageProps = {
  plant: {
    id: number;
    image: string | null;
    model: { image: string };
  };
  selectedPlantId: number | null;
};

const PlantImage: React.FC<PlantImageProps> = ({ plant, selectedPlantId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // Determine source URL and object-fit
  const src = plant.image !== null ? plant.image : `/images/plants-img/${plant.model.image}.png`;
  const objectFitValue = plant.image !== null ? "cover" : "contain";
  const isSelected = selectedPlantId === plant.id;

  return (
    <div className="relative h-full w-full flex justify-center items-center">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-[#87b57d] border-solid rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt="Plant Image"
        fill
        sizes="max-width: 100%; max-height: 100%;"
        className={`rounded-lg ${isSelected ? "border-[1px] border-[#277a1c]" : "border border-primary/20"}`}
        style={{ objectFit: objectFitValue }}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
};


function PlantsCaroussel() {
    /* const { data: session, status } = useSession(); */
    const dispatch = useDispatch();
    const plants = useSelector((state: RootState) => state.allThePlants.value);
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);

    const fetchSelectedPlant = (plantId: number) => {
      const plantInfos = plants.find((p) => p.id === plantId);
      if (plantInfos) {
        dispatch(select(plantInfos));
      }
    };

    return (

        <div className='swip w-[100%] h-full max-w-[400px] rounded-md z-20 flex justify-center items-center' > 
            {plants.length === 0 ? <p>No plants yet</p> :

                <Swiper 
                className='w-full h-full text-black'
                direction="horizontal"
                modules={[Navigation, A11y, Grid, Scrollbar, Mousewheel, FreeMode]}
                spaceBetween={10}
                slidesPerView={3} 
                grid={{ rows: 2}}
                loop={false}
                scrollbar={{draggable: true}}
                freeMode={true}
                mousewheel={{enabled: true}}
                centeredSlides={false} 
                onSwiper={() => console.log("swipe")}
                onSlideChange={async () => {}}
                >

                {
                    plants.length !== 0 ? plants.map((plant, index) => (
                    <SwiperSlide 
                        key={index}
                        className="flex justify-center items-center shadow-md rounded-xl bg-white max-w-[130px] hover:cursor-pointer "
                        onClick={()=> {fetchSelectedPlant(plant.id)}}
                    >
                        <div className="h-full flex flex-col justify-center items-center">
                        <div className="h-[90%] w-[90%]">
                          <PlantImage plant={plant} selectedPlantId={selectedPlant ? selectedPlant.id : null} />
                        </div>
                        </div>
                    </SwiperSlide>
                    )) : ""}
                </Swiper>
            }
        </div>
    )
    }

export default PlantsCaroussel