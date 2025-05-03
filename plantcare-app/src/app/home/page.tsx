"use client"

// CSS
import "../../styles/dashboard.css"

// React
import { useEffect } from "react";

// Redux
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Components
import Sidebar from "@/components/Sidebar"
import DashboardSection from "@/components/dashboardSection/DashboardSection";
import MyPlantsSection from "@/components/myPlantsSection/MyPlantsSection";
import DiseasesSection from "@/components/diseasesSection/DiseasesSection";

// Images
import BgPlant from "../../images/Background-Illustration.png"
import LeafTexture from "../../images/leaf-texture.webp"

// Auth.JS
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// API
import { refreshData } from "@/lib/api/others";

export default function Home() {
    // Redux
    const activeSection = useSelector<RootState, string>(
        (state) => state.activeSection.activeSection
    );


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
                
                {activeSection === "dashboard" ? <DashboardSection/> : 
                activeSection === "plants" ? <MyPlantsSection/> :
                activeSection === "diseases" ? <DiseasesSection/> : ""}

            </div>

        </div>
    )
}
