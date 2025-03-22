"use client";

import { useState, useEffect } from "react";

// Redux 
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import "swiper/css/effect-coverflow"
import "../styles/plantsCaroussel.css"
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';

// Image
import PlantImg from "@/images/plant-card.png"
import Image from "next/image";

// API
import { getPlantsFromUser, Plant } from "@/lib/api/plants"


function PlantsCaroussel() {
    const updatePlants = useSelector((state: RootState) => state.updatePlants.value);
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

        <div className=' w-[100%] h-full max-w-[400px] rounded-md z-20 flex justify-center items-center'>
            {plants.length === 0 ? <p>No plants yet</p> :

                <Swiper 
                className='w-full h-full text-black'
                modules={[Navigation, Pagination, A11y, Grid]}
                spaceBetween={10}
                slidesPerView={3} 
                grid={{ rows: 2}}
                loop={false}
                pagination={{ clickable: true }}
                centeredSlides={false} 
                onSwiper={() => console.log("swipe")}
                onSlideChange={() => {console.log('slide change')}}
                >

                {
                    plants.map((plant, index) => (
                    <SwiperSlide 
                        key={index}
                        className="flex justify-center items-center shadow-xl rounded-xl bg-white max-w-[130px] "
                        onClick={()=> {console.log(`${plant.model.name}`)}}
                    >
                        <div className="h-full flex flex-col justify-center items-center">
                        <span className="h-[10%]">{plant.model.name}</span>
                        <div className="relative h-[90%] w-full">
                                <Image
                                src={PlantImg}
                                alt="Plant Image"
                                fill
                                objectFit="contain"
                                />
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            }
        </div>
    )
    }

export default PlantsCaroussel