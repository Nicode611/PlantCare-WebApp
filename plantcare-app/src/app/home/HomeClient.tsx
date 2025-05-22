'use client';

// React
import { useEffect } from "react";

// Redux
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Components
import DashboardSection from "@/components/dashboardSection/DashboardSection";
import MyPlantsSection from "@/components/myPlantsSection/MyPlantsSection";
import DiseasesSection from "@/components/diseasesSection/DiseasesSection";

// API
import { refreshData } from "@/lib/api/others";

export default function HomeClient() {
    // Redux
    const activeSection = useSelector<RootState, string>(
        (state) => state.activeSection.activeSection
    );

    // Call the data refresh function when the component mounts
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

    return (
        <div className="flex-1 z-30 relative overflow-auto">
            {activeSection === "dashboard" ? <DashboardSection/> : 
            activeSection === "plants" ? <MyPlantsSection/> :
            activeSection === "diseases" ? <DiseasesSection/> : ""}
        </div>
    );
}


