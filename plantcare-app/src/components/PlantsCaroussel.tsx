"use client";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/grid";
import "swiper/css/effect-coverflow"
import "../styles/plantsCaroussel.css"
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';



// API
import { getPlantsFromUser, Plant } from "@/lib/api/plants"


function PlantsCaroussel() {

    const [plants, setPlants] = useState<Plant[]>([]);

    const getPlants = async () => {
        const userId = 1;
        const plantsOfUser = await getPlantsFromUser(userId);

        if (plantsOfUser.length !== 0) {
            setPlants(plantsOfUser);
        }
    }

    useEffect(() => {
        getPlants();
    }, []);

    return (

        <div className=' w-[100%] h-full max-w-[400px] rounded-md z-20'>
            <Swiper 
            className='w-full h-full text-black'
            modules={[Navigation, Pagination, A11y, Grid]}
            spaceBetween={10}
            slidesPerView={3} // Définit 3 colonnes visibles
            grid={{ rows: 2}}
            loop={false}
            pagination={{ clickable: true }}
            centeredSlides={false} // Désactiver le centrage pour un affichage correct
            onSwiper={() => console.log("swipe")}
            onSlideChange={() => {console.log('slide change')}}
            >

            {
                plants.map((plant, index) => (
                <SwiperSlide 
                    key={index}
                    className="flex justify-center items-center shadow-xl rounded-xl bg-[#CDD9CA] max-w-[130px] "
                    onClick={()=> {console.log(`../images/${plant.model.image}`)}}
                >
                    <div className="relative h-10 flex justify-center items-center">
                        {/* <Image
                        src={''}
                        alt="Plant Image"
                        fill
                        className="object-contain z-50"
                        /> */}
                        {plant.model.name}
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
    }

export default PlantsCaroussel