// Next
import Image from "next/image"

function TasksModule() {
    return (
        <div className="w-full h-full flex items-center rounded-md p-3">
            <div className="w-[70%] h-full flex flex-col items-center m-1 shadow-inner bg-[#0000001c] overflow-y-auto rounded-md p-3">
                <ul className="flex flex-col items-center w-[95%]">
                    <li className="w-full flex justify-center m-1">
                        <div className="w-full text-[0.8rem] flex justify-between items-center bg-[#ffffff] border border-primary rounded-md shadow-primaryShadow">
                            <div className="flex items-center">
                                <Image
                                src={"/icons/droplet.svg"}
                                alt={"Droplet icon"}
                                width={25}
                                height={25}
                                className="m-2"
                                />
                                <div className="flex flex-col">
                                    <span className="leading-tight"><strong>Water</strong> lounge plant</span>
                                    <span className="leading-tight text-red-700">2 days ago</span>
                                </div>
                            </div>
                            <button className=" h-6 border border-primary leading-tight pr-4 pl-4 rounded-md m-1 active:bg-primary active:text-white active:shadow-activeButton">Done</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex flex-col justify-center items-center w-[30%] h-full m-1 ">
                <div className="flex flex-col justify-around items-center bg-primary text-white font-bold rounded-md w-[80%] h-[75%] m-2 pt-3 pb-3 whitespace-nowrap">
                    <span className="text-[0.8rem] ">Total tasks</span>
                    <span>5</span>
                </div>
                <button className="bg-secondary shadow-button rounded-md text-white w-[75%] h-[25%] m-2 active:shadow-activeButton">Add task</button>
            </div>
        </div>
    )
}

export default TasksModule
