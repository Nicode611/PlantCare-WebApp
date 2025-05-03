"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/redux/store";
import { open} from "@/redux/slices/modalSlice"

// Components
import PlantsCaroussel from "../PlantsCaroussel"
import AddPlantModal from "../modals/AddPlantModal";

function PlantsModule() {

    const dispatch = useDispatch();

    const { activeModal, modalProps } = useSelector((state: RootState) => state.modal);
    const selectedAction = (modalProps as { actionName?: string }).actionName;
    const modalState = activeModal === "plant" && selectedAction === "add";



    return (
        <div className="w-full h-full flex flex-col items-center rounded-md p-3">
            <div className="w-full h-[20%] flex justify-around items-center">
                <span className="w-[80%] text-[1.9rem] font-sans font-bold ml-7">My plants</span>
                <div className="w-[20%]">
                    <button className="bg-secondary shadow-button rounded-md text-white w-[50px] text-[2rem] font-bold m-2 active:shadow-activeButton" onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>
                        +
                    </button>
                    {modalState && <AddPlantModal />}
                </div>            
            </div>
            <div className="w-full h-[80%] flex justify-center items-center bg-[#0000001c] shadow-inner rounded-md">
                <PlantsCaroussel/>
            </div>
        </div>

            
    )
}

export default PlantsModule
