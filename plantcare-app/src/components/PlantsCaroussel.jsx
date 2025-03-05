import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow"
import "../styles/plantsCaroussel.css"
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import Image from "next/image";

import PlantImg from "../images/plant-test.png"


function PlantsCaroussel() {

    return (
        <div className='w-[100%] mb-5'>
            <Swiper className='w-full h-52 text-black'
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

            {[...Array(5)].map((_, index) => (
                <SwiperSlide 
                    key={index}
                    className="flex justify-center items-center w-10 shadow-xl rounded-xl bg-[#CDD9CA] "
                    onClick={()=> {console.log(index)}}
                >
                    <div className="relative h-full flex justify-center items-center">
                        <Image
                        src={PlantImg}
                        alt="Plant Image"
                        fill
                        className="object-contain z-50"
                        />
                    </div>
                </SwiperSlide>
                ))}
                
                ...
            </Swiper>
        </div>
    )
    }

export default PlantsCaroussel