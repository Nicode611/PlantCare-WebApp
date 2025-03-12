// Components
import PlantsCaroussel from "../PlantsCaroussel"

function PlantsModule() {
    return (
        <div className="w-full h-full flex flex-col items-center rounded-md p-3">
            <div className="w-full h-[20%] flex justify-around items-center">
                <span className="w-[80%] text-[1.8rem] font-bold ml-7">My plants</span>
                <div className="w-[20%]">
                    <button className="bg-secondary shadow-button rounded-md text-white w-[50px] text-[2rem] font-bold m-2 active:shadow-activeButton">+</button>      
                </div>            
            </div>
            <div className="w-full h-[80%] flex justify-center items-center bg-[#0000001c] shadow-inner rounded-md">
                <PlantsCaroussel/>
            </div>
        </div>
    )
}

export default PlantsModule
