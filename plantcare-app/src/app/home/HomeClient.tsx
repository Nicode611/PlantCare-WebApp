'use client';

// React
import { useEffect } from "react";

// Redux
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// Session
import { useSession } from 'next-auth/react';

// Components
import DashboardSection from "@/components/dashboardSection/DashboardSection";
import MyPlantsSection from "@/components/myPlantsSection/MyPlantsSection";
/* import DiseasesSection from "@/components/diseasesSection/DiseasesSection"; */
import TasksSection from "@/components/tasksSection/TasksSection";

// API
import { refreshData } from "@/lib/api/others";

export default function HomeClient() {
    // Session
    const { data: session } = useSession();
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
        <div className={`flex-1 z-30 relative overflow-auto ${session?.user.theme === "light" ? "bg-bgLighter": "bg-bgDarker" }`}>
            {activeSection === "dashboard" ? <DashboardSection/> : 
            activeSection === "plants" ? <MyPlantsSection/> :
            activeSection === "diseases" ?/*  <DiseasesSection/> */ "" :
            activeSection === "tasks" ? <TasksSection/> : ""}
        </div>
    );
}


