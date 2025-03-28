"use client";

import { useState, useEffect } from "react";

// Redux 
import type { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { select } from "@/redux/slices/plants/selectPlantSlice";

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

// API
import { getPlantsFromUser } from "@/lib/api/plants"

// Types
import { Plant } from "@/types/plant";


function PlantsCaroussel() {
    const dispatch = useDispatch();
    const updatePlants = useSelector((state: RootState) => state.updatePlants.value);
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const [plants, setPlants] = useState<Plant[]>([]);

    const getPlants = async () => {
        const userId = 1;
        const plantsOfUser = await getPlantsFromUser(userId);

        if (plantsOfUser.length !== 0) {
            setPlants(plantsOfUser);
        }
    }

    useEffect(()=>{ 
        getPlants();
    },[updatePlants])

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
                onSlideChange={() => {console.log('slide change')}}
                >

                {
                    plants.length !== 0 ? plants.map((plant, index) => (
                    <SwiperSlide 
                        key={index}
                        className="flex justify-center items-center shadow-xl rounded-xl bg-white max-w-[130px] hover:cursor-pointer "
                        style={plant.id === selectedPlant!.id ? { border: "solid 1px #277a1c", boxShadow: "0px 1px 8px #277a1c" } : {}}
                        onClick={()=> {dispatch(select(plant))}}
                    >
                        <div className="h-full flex flex-col justify-center items-center">
                        <div className="relative h-[90%] w-full">
                                <Image
                                src={`/images/plants-img/${plant.model.image}.png`}
                                alt="Plant Image"
                                fill
                                sizes="max-width: 100%; max-height: 100%;"
                                style={{ objectFit: "contain" }}
                                />
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