"use client"

// CSS
import "../../styles/dashboard.css"

// React
import { useEffect } from "react";

// Components
import Sidebar from "@/components/Sidebar"
import TasksModule from "@/components/dashboard/TasksModule"
import PlantsModule from "@/components/dashboard/PlantsModule"
import CalendarModule from "@/components/dashboard/CalendarModule"
import CaringModule from "@/components/dashboard/CaringModule"
import DiseasesModule from "@/components/dashboard/DiseasesModule"

// Images
// import PlantImg from "../../images/plant-card.png"
// import BlueDrop from "../../images/droplet-blue.png"
// import BlackDrop from "../../images/droplet-black.png"
import BgPlant from "../../images/Background-Illustration.png"
import LeafTexture from "../../images/leaf-texture.webp"

// Auth.JS
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// API
import { refreshData } from "@/lib/api/others";

export default function Dashboard() {

    // Call the signInEvents function when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                await refreshData();
            } catch (error) {
                console.error("Cannot refresh the data : ", error);
                // Handle the error as needed
            }
        };
        fetchData();
    }, []);

    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return null;
    }
      if (!session) {
        router.push('..');
        return null;
    }

    return (
        <div className="swip flex w-screen h-screen bg-[#fef8ea]">
            <div className="flex flex-col md:flex-row w-screen h-full overflow-hidden" >

                {/* Background */}
                <div className="absolute bg-black bg-opacity-10 w-full h-full z-40"></div>
                <div className="absolute right-0 top-[-200px] w-[70%] h-[700px] bg-[#87b57d] bg-opacity-[70%] z-10" 
                style={{clipPath: "ellipse(100% 50% at 100% 50%)"}}></div>
                <div className="absolute right-0 top-[-220px] w-[73%] h-[750px] bg-[#8bbf87] bg-opacity-[40%] z-0" 
                    style={{ clipPath: "ellipse(100% 50% at 100% 50%)"}}></div>
                <div className="absolute right-0 top-[-200px] w-[70%] h-[700px] z-1" 
                    style={{ clipPath: "ellipse(100% 50% at 100% 50%)", backgroundImage: `url(${LeafTexture.src})`, backgroundAttachment: "fixed", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <div className="absolute left-0 bottom-[-350px] w-[50%] h-[700px] bg-[#87b57d] bg-opacity-[70%] z-10" style={{clipPath: "ellipse(100% 50% at 0% 50%)"}}></div>
                <div className="absolute left-0 bottom-[-350px] w-[55%] h-[775px] bg-[#8bbf87] bg-opacity-[40%] z-0" style={{ clipPath: "ellipse(100% 50% at 0% 50%) "}}></div>
                <div className="absolute left-0 bottom-[-350px] w-[50%] h-[700px] z-1" style={{ clipPath: "ellipse(100% 50% at 0% 50%)", backgroundImage: `url(${LeafTexture.src})`, backgroundAttachment: "fixed", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                <div className="absolute right-[-25px] bottom-[-400px] w-[50%] h-[700px]" style={{backgroundImage: `url(${BgPlant.src})`}}></div>


                {/* Sidebar */}
                <div className="relative  h-12 md:w-[20%] md:h-full md:min-w-44 md:max-w-[300px] w-full z-50">
                    <Sidebar/>
                </div>

                {/* Main content */}
                <section className="w-full md:w-[80%] flex justify-center items-center m-2 z-50" style={{ overscrollBehaviorX: "contain" }}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="flex w-full h-[70%] m-2 mr-0 ml-0">
                            <div className="flex flex-col w-[60%] h-full mt-2 mr-2 mb-2">
    
                                <div className="w-full h-[30%] m-2 bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                                    <TasksModule/>
                                </div>
    
                                <div className="w-full h-[70%] m-2 bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                                    <CaringModule/>
                                </div>
                            </div>
                            <div className="flex flex-col w-[40%] h-full m-2">
                                <div className="w-full h-[60%] m-2 bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                                    <PlantsModule/>
                                </div>
                                <div className="w-full h-[40%] m-2 bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                                    <CalendarModule></CalendarModule>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[30%] justify-center m-2 p-2 bg-[#f2f2f2] bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg overflow-x-auto">
                            <DiseasesModule/>
                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}
