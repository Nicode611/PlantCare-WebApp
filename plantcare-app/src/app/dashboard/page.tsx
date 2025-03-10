
// import Image from "next/image";

// CSS
import "../../styles/dashboard.css"

// Components
// import Calendar from "../../components/Calendar"

// Images
// import PlantImg from "../../images/plant-card.png"
// import BlueDrop from "../../images/droplet-blue.png"
// import BlackDrop from "../../images/droplet-black.png"
import BgPlant from "../../images/Background-Illustration.png"
import LeafTexture from "../../images/leaf-texture.webp"



export default function Dashboard() {

    


    return (
        <div className="flex w-screen h-screen bg-[#fef8ea]">
            <div className="relative flex w-screen h-full overflow-hidden">

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
                <section className="w-[20%] bg-white shadow-spread z-50">

                </section>

                <section className="w-[77%] flex flex-col items-center m-2 z-50">
                    <div className="flex w-full h-[70%] m-2 mr-0 ml-0">
                        <div className="flex flex-col w-full h-full m-2">
                            <div className="w-full h-[30%] m-2 bg-white bg-opacity-85 shadow-spread rounded-md"></div>
                            <div className="w-full h-[70%] m-2 bg-white bg-opacity-85 shadow-spread rounded-md"></div>
                        </div>
                        <div className="flex flex-col w-full h-full m-2">
                            <div className="w-full h-[60%] m-2 bg-white bg-opacity-85 shadow-spread rounded-md"></div>
                            <div className="w-full h-[40%] m-2 bg-white bg-opacity-85 shadow-spread rounded-md"></div>
                        </div>
                    </div>
                    <div className="w-full h-[30%] m-2 ml-6 bg-white bg-opacity-85 shadow-spread rounded-md">

                    </div>
                </section>

            </div>

        </div>
    )
}
