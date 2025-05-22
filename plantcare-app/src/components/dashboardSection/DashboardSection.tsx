import React from 'react'

// Components
import TasksModule from "@/components/dashboardSection/TasksModule"
import PlantsModule from "@/components/dashboardSection/PlantsModule"
import CalendarModule from "@/components/dashboardSection/CalendarModule"
import CaringModule from "@/components/dashboardSection/CaringModule"
import DiseasesModule from "@/components/dashboardSection/DiseasesModule"

export default function dashboardSection() {
    return (
        <section className="w-full h-full flex justify-center items-center p-2 z-50 backdrop-blur-md "
        style={{ overscrollBehaviorX: "contain", backdropFilter: "blur(5px)" }}
        >
            <div className="w-full h-full flex flex-col justify-center items-center">
                <div className="flex w-full h-[70%] m-2 mr-0 ml-0">
                    <div className="flex flex-col w-[60%] h-full mt-2 mr-2 mb-2">

                        <div className="w-full h-[30%] m-2 bg-[#f2f2f2] backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                            <TasksModule/>
                        </div>

                        <div className="w-full h-[70%] m-2 bg-[#f2f2f2] backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                            <CaringModule/>
                        </div>
                    </div>
                    <div className="flex flex-col w-[40%] h-full m-2">
                        <div className="w-full h-[60%] m-2 bg-[#f2f2f2] backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                            <PlantsModule/>
                        </div>
                        <div className="w-full h-[40%] m-2 bg-[#f2f2f2] backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg ">
                            <CalendarModule></CalendarModule>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[30%] justify-center m-2 p-2 bg-[#f2f2f2] backdrop-blur-lg backdrop-saturate-150 border border-white/30 rounded-lg shadow-lg overflow-x-auto">
                    <DiseasesModule/>
                </div>
            </div>
        </section>
    )
}
