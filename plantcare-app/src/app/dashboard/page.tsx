
import Image from "next/image";

// CSS
import "../../styles/dashboard.css"

// Components
import PlantsCaroussel from "../../components/PlantsCaroussel"
import Calendar from "../../components/Calendar"
import PrimaryButton from "../../components/PrimaryButton"
import WaterButton from "../../components/WaterButton"
import PlantDecease from "../../components/sections/PlantsDiseases"

// Images
import PlantImg from "../../images/plant-card.png"
import BlueDrop from "../../images/droplet-blue.png"
import BlackDrop from "../../images/droplet-black.png"
import BgPlant from "../../images/Background-Illustration.png"
import LeafTexture from "../../images/leaf-texture.webp"



export default function Dashboard() {

    


  return (
    <div className="flex flex-col bg-[#fef8ea]">
        <div className={` h-screen flex flex-col items-center bg-[#fef8ea] relative overflow-x-hidden pl-5 pr-5`} >
    
        <div className="absolute right-0 top-[-200px] w-[70%] h-[700px] bg-[#87b57d] bg-opacity-[90%] z-10" 
        style={{clipPath: "ellipse(100% 50% at 100% 50%)"}}></div>
    
        <div className="absolute right-0 top-[-220px] w-[73%] h-[750px] bg-[#8bbf87] bg-opacity-[40%] z-0" 
            style={{ clipPath: "ellipse(100% 50% at 100% 50%)"}}></div>

        <div className="absolute right-0 top-[-200px] w-[70%] h-[700px] z-1" 
                    style={{ clipPath: "ellipse(100% 50% at 100% 50%)", backgroundImage: `url(${LeafTexture.src})`, backgroundAttachment: "fixed", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

    
            <header className="w-full flex justify-between items-center z-20">
                <h1 className="font-sans text-[3rem] m-5">PlantCare</h1>
                <nav className="flex items-center">
                    <ul className="flex items-center">
                        <li><a className="m-2" href="../">Home</a></li>
                        <li><a className="m-2" href="">Settings</a></li>
                        <li><a className="m-2" href="">Account</a></li>
                    </ul>
                    <div className="flex items-center ml-10 text-[3rem] font-fancy hover:cursor-pointer">
                        +
                    </div>
                </nav>
            </header>
    
            <section className="relative w-full flex justify-center">
                <PlantsCaroussel></PlantsCaroussel>
            </section>
    
            <section className="w-full h-full flex flex-col items-center z-20">
                <h2 className="font-fancy text-[2.8rem]">Plant name</h2>
                <div className="relative w-full h-[100%] flex">
                    <div className="relative w-[60%] flex justify-around items-center">
    
                        <div className="w-[15%] h-full flex flex-col justify-center items-center">
                            <h2 className="font-fancy text-[1.2rem]">Water level</h2>
                            <div className="h-[80%] w-[20px] rounded-full shadow-md border-gray-300 bg-gradient-to-t from-[#088193] from-30% to-[#fef8ea] to-40% m-3"></div>
                            <WaterButton></WaterButton>
                        </div>
                        <div className="relative w-[85%] h-full ">
                            <Image
                                src={PlantImg}
                                alt="Plant Image"
                                fill
                                className="object-contain !min-h-[100%] z-20"
                            />
                            <div className="absolute shadow bottom-4 "></div>
                            <div className="absolute bottom-3 right-3 grid grid-rows-1 grid-cols-5 ">
                                <div className="flex justify-center">
                                    <Image
                                        src={BlueDrop}
                                        alt="Blue drop"
                                        width={30}
                                        height={30}
                                        className="object-contain z-0"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <Image
                                        src={BlueDrop}
                                        alt="Blue drop"
                                        width={30}
                                        height={30}
                                        className="object-contain z-0"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <Image
                                        src={BlueDrop}
                                        alt="Blue drop"
                                        width={30}
                                        height={30}
                                        className="object-contain z-0"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <Image
                                        src={BlackDrop}
                                        alt="Black drop"
                                        width={30}
                                        height={30}
                                        className="object-contain z-0"
                                    />
                                </div>
                                <div className="flex justify-center">
                                    <Image
                                        src={BlackDrop}
                                        alt="Black drop"
                                        width={30}
                                        height={30}
                                        className="object-contain z-0"
                                    />
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    <div className="w-[40%] flex flex-col justify-center ">
                        
                        <div className="max-h-[80%] overflow-y-auto mr-2 ml-2">
                            <h2 className="font-fancy text-[2.8rem] text-right m-2">Some infos</h2>
                            <p className="text-[0.9rem] mb-10">
                            Lilipus antonaris is a rare, bioluminescent plant found in dense tropical forests. Its translucent, spiraling leaves emit a soft blue glow at night, attracting nocturnal pollinators.<br></br><br /> The plant produces tiny, ruby-colored fruits with a spicy, citrus-like flavor. It thrives in humid environments and is known for its rapid growth after heavy rainfall. Some indigenous cultures use its sap for medicinal purposes, believing it enhances mental clarity.
                            
                            </p>
                            
                        </div>
                        <div className="flex justify-between mb-2">
                            <PrimaryButton title={"Plant settings"}></PrimaryButton>
                            <PrimaryButton title={"Add plant"}></PrimaryButton>
                        </div>
    
                    </div>
                </div>
            </section>
        </div>

        <section className="relative flex flex-col items-center w-[100%] overflow-hidden bg-[#fef8ea] pt-10 pb-10">
            <div className="flex flex-col items-end w-[80%]">
                <h2 className="font-fancy text-[2.8rem] m-5">Watering calendar</h2>
                    <Calendar></Calendar>
            </div>

            <section className="relative flex justify-center w-[100%] max-h-[100vh]  bg-[#fef8ea] pt-10 pb-10">
                <PlantDecease></PlantDecease>
            </section>

            <div className="absolute left-0 top-[90px] w-[50%] h-[700px] bg-[#87b57d] bg-opacity-[90%] z-10" style={{clipPath: "ellipse(100% 50% at 0% 50%)"}}></div>
            <div className="absolute left-0 top-[70px] w-[55%] h-[775px] bg-[#8bbf87] bg-opacity-[40%] z-0" style={{ clipPath: "ellipse(100% 50% at 0% 50%)"}}></div>

            <div className="absolute left-0 top-[90px] w-[50%] h-[700px] z-1" style={{ clipPath: "ellipse(100% 50% at 0% 50%)", backgroundImage: `url(${LeafTexture.src})`, backgroundAttachment: "fixed", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>

            <div className="absolute right-[-25px] bottom-[-400px] w-[50%] h-[700px]" style={{backgroundImage: `url(${BgPlant.src})`}}></div>
        </section>

    </div>
  )
}
