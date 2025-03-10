"use client";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow"
import "../styles/plantsCaroussel.css"
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';



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

        <div className=' w-[100%] min-w-[245px] max-w-[400px] z-20 mt-[-60px]'>
            <Swiper className='w-full text-black'
                modules={[Navigation, Pagination, A11y, EffectCoverflow]}
                spaceBetween={10}
                slidesPerView={3}
                loop={false}
                pagination={{ clickable: true }}
                effect='coverflow'
                initialSlide={1}
                slideToClickedSlide={true}
                centeredSlides={true}
                onSwiper={() => {console.log("swipe")}}
                onSlideChange={() => console.log('')}
            >

            {
                plants.map((plant, index) => (
                <SwiperSlide 
                    key={index}
                    className="flex justify-center items-center shadow-xl rounded-xl bg-[#CDD9CA] "
                    onClick={()=> {console.log(`../images/${plant.model.image}`)}}
                >
                    <div className="relative h-full flex justify-center items-center">
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