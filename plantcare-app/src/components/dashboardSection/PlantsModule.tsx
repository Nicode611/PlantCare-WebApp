"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store";
import { open} from "@/redux/slices/modalSlice"

// Components
import PlantsCaroussel from "../PlantsCaroussel"
import AddPlantModal from "../modals/AddPlantModal";

// Lucide
import { Plus } from "lucide-react";

function PlantsModule() {

    const dispatch = useDispatch();

    const { activeModal, modalProps } = useSelector((state: RootState) => state.modal);
    const selectedAction = (modalProps as { actionName?: string }).actionName;
    const modalState = activeModal === "plant" && selectedAction === "add";



    return (
        <div className="w-full h-full flex flex-col items-center rounded-md p-3">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-primary text-2xl font-bold mt-0 p-3">Plants</h3>
                <div className="">
                    <button className="flex justify-center items-center bg-secondary shadow-button rounded-md text-white h-[40px] w-[40px] my-3 mr-1 active:shadow-activeButton" onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>
                        <Plus></Plus>
                    </button>
                    {modalState && <AddPlantModal />}
                </div>            
            </div>
            <div className="w-full h-[80%] flex justify-center items-center bg-secondary bg-opacity-50 shadow-inner rounded-md">
                <PlantsCaroussel/>
            </div>
        </div>

            
    )
}

export default PlantsModule
