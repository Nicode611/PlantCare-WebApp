import React from 'react'

// Components
import TasksModule from "@/components/dashboardSection/TasksModule"
import PlantsModule from "@/components/dashboardSection/PlantsModule"
import CalendarModule from "@/components/dashboardSection/CalendarModule"
import CaringModule from "@/components/dashboardSection/CaringModule"
import DiseasesModule from "@/components/dashboardSection/DiseasesModule"

export default function dashboardSection() {
    return (
        <section className="w-full h-full flex justify-center items-center p-2 z-50 backdrop-blur-md overflow-y-auto"
        style={{ overscrollBehaviorX: "contain", backdropFilter: "blur(5px)" }}
        >
            <div className="w-full h-full flex flex-col justify-start items-center">
                {/* La grille principale passe en colonne sur mobile/tablette */}
                <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[70%] m-2 mr-0 ml-0">
                    {/* Première colonne qui prend toute la largeur sur mobile */}
                    <div className="flex flex-col w-full lg:w-[60%] h-auto lg:h-full mt-2 mr-0 lg:mr-2 mb-2">
                        {/* Module des tâches */}
                        <div className="w-full h-[200px] lg:h-[30%] m-2 bg-[#ffffff] border border-white/30 rounded-lg shadow-lg">
                            <TasksModule/>
                        </div>
                        {/* Module de soin */}
                        <div className="w-full h-[300px] lg:h-[70%] m-2 bg-[#ffffff] border border-white/30 rounded-lg shadow-lg">
                            <CaringModule/>
                        </div>
                    </div>
                    {/* Deuxième colonne qui prend toute la largeur sur mobile */}
                    <div className="flex flex-col w-full lg:w-[40%] h-auto lg:h-full m-2">
                        {/* Module des plantes */}
                        <div className="w-full h-[250px] lg:h-[60%] m-2 bg-[#ffffff] border border-white/30 rounded-lg shadow-lg">
                            <PlantsModule/>
                        </div>
                        {/* Module du calendrier */}
                        <div className="w-full h-[200px] lg:h-[40%] m-2 bg-[#ffffff] border border-white/30 rounded-lg shadow-lg">
                            <CalendarModule></CalendarModule>
                        </div>
                    </div>
                </div>
                {/* Module des maladies */}
                <div className="w-full h-[250px] lg:h-[30%] justify-center m-2 bg-[#ffffff] border border-white/30 rounded-lg shadow-lg overflow-x-auto">
                    <DiseasesModule/>
                </div>
            </div>
        </section>
    )
}
