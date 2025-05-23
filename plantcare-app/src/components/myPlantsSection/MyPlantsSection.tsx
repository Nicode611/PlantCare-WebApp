import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { formatDistanceToNow } from 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { open } from "@/redux/slices/modalSlice";
import { select } from "@/redux/slices/plants/selectPlantSlice";

import type { RootState } from "@/redux/store";
import { getPlantsFromUser } from "@/lib/api";
import AddPlantModal from "../modals/AddPlantModal";

// Images
import Image from "next/image";
import FullDrop from "@/images/droplet-blue.png";

// Lucide
import { Sun } from "lucide-react";
import { Shell } from "lucide-react";
import { Thermometer } from "lucide-react";
import { Bug } from "lucide-react";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";

// Types
import { Plant } from "@/types/plant";

// Lucide
import { ChevronRight } from "lucide-react"

// Shadcn
import { Button } from "@/components/ui/button"

// Components
import SwitchButton from "@/components/ui/switchButton/SwitchButton";

export default function MyPlantsSection() {
    const { data: session, status } = useSession();

    const dispatch = useDispatch();

    const updatePlants = useSelector((state: RootState) => state.updatePlants.value);
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const { activeModal, modalProps } = useSelector((state: RootState) => state.modal);
    const selectedAction = (modalProps as { actionName?: string }).actionName;
    const modalState = activeModal === "plant" && selectedAction === "add";

    const [plants, setPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchPlants = async () => {
        if (session?.user?.id) {
          setLoading(true);
          try {
            const plantsData = await getPlantsFromUser(session.user.id);
            setPlants(plantsData);
          } catch (error) {
            console.error("Error fetching plants:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchPlants();
    }, [session, updatePlants]);


    return (
        <section 
            className="w-full h-screen flex flex-col justify-start items-center p-5 z-50 backdrop-blur-md"
        style={{ overscrollBehaviorX: "contain", backdropFilter: "blur(5px)" }}
        >
          {modalState && 
          <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/50 z-50">
            <AddPlantModal />
          </div>
          }
          <div className='w-full h-auto flex  justify-between items-center px-10 py-5'>
            <div className='flex flex-col justify-center items-start'>
              <h2 className='text-primary text-3xl font-bold'>My plants</h2>
              <span className='text-gray-600 font-bold'>Manage all your lovely plants in one place.</span>
            </div>
            <button className='bg-primary text-white text-sm rounded-lg px-4 py-2 hover:bg-primary/80 transition-all duration-300 ease-in-out' onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>+ Add a plant</button>
          </div>
          <div className="w-full h-auto ">
            {loading || status === "loading" ? (
              <div className="flex flex-col items-center w-full py-10">
                  <div className="relative w-10 h-10">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-[#98C496] border-opacity-20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#08740C] rounded-full animate-spin"></div>
                  </div>
                  <p className="mt-4 text-[#08740C] font-medium">Chargement...</p>
              </div>
            ) : status !== "authenticated" || !session?.user ? (
                    // En cas d'erreur d'authentification
                    <nav className="hidden md:flex flex-col items-center justify-center w-[100%] md:mt-5">
                        <p className="text-sm text-gray-500">Merci de vous reconnecter</p>
                    </nav>
            ) : ( 

                // Affichage des plantes
                <div className="flex flex-col md:flex-row justify-around gap-4 p-4 mt-4">
                    <div className="flex flex-col items-start justify-center w-full h-full bg-white rounded-lg shadow-md md:w-[25%] p-2 py-5">
                      <h3 className="text-xl text-left font-semibold text-primary pl-2">My plants</h3>
                      <input type="text" placeholder="Search" className="w-full p-2 my-4 bg-gray-200 rounded-lg mb-4" />
                      {plants.length > 0 ? (
                          plants.map((plant) => (
                              <div key={plant.id} className="overflow-x-hidden flex items-center w-full p-2 bg-white rounded-lg my-2 hover:cursor-pointer" style={selectedPlant ? plant.id === selectedPlant!.id ? { background: "#a8cba680", border: "solid 1px #277a1c81"  } : {} : {}} onClick={() => {dispatch(select(plant))}}>
                                  <div className="flex items-center w-[80%]">
                                    <Image
                                    src={`/images/plants-img/${plant.model.image}.png`}
                                    alt={plant.model.name}
                                    width={100}
                                    height={100}
                                    className="w-10 h-w-10 rounded-full"
                                    style={{ objectFit: "cover" }}
                                    loading="lazy"
                                    /> 
                                    <div className="flex flex-col w-[80%]">
                                      <h3 className="text-xs text-primary whitespace-nowrap truncate w-[80%] font-semibold">{plant.model.name}</h3>
                                      <p className="text-xs text-gray-600 opacity-80 text-left">{plant.location}</p>
                                    </div>
                                  </div>
                                  <div className="w-[20%]">
                                    <Button variant="outline" size={"icon"} className="bg-primary/10 hover:bg-primary/20 text-primary rounded-full p-2 mr-2">
                                      <ChevronRight />
                                    </Button>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <p className="text-gray-500">Aucune plante trouvée.</p>
                      )}
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-md md:w-[75%]">
                      {selectedPlant && (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <div className="flex items-center justify-between w-full p-2 bg-white rounded-lg">
                            <div className="flex items-center w-full">
                              <Image
                              src={`/images/plants-img/${selectedPlant?.model.image}.png`}
                              alt={selectedPlant?.model.name}
                              width={100}
                              height={100}
                              className="w-20 rounded-full mb-2"
                              style={{ objectFit: "cover" }}
                              loading="lazy"
                              /> 
                              <div className="flex flex-col w-[80%]">
                                <h3 className="text-xl text-primary whitespace-nowrap truncate w-[80%] font-semibold">{selectedPlant?.model.name}</h3>
                                <p className="text-md text-gray-600 opacity-80 text-left">{selectedPlant?.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-center pr-5">
                              <button className="flex items-center bg-secondary bg-opacity-40 text-primary font-bold text-sm rounded-lg px-4 py-2 hover:bg-primary/80 hover:text-white transition-all duration-300 ease-in-out" onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>
                              <SquarePen color="#0b5b11" className="w-5 mr-2" />
                              Edit
                              </button>
                              <button className="flex items-center bg-red-500 bg-opacity-40 text-red-600 font-bold text-sm rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out ml-2">
                                <Trash2 color="#be0e0e" className="w-5 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-around w-full h-full gap-4 p-4">
                            <div className="flex flex-col w-[55%] h-auto">
                              <h3 className="text-primary text-lg font-bold">Plant details</h3>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                
                                <div className="flex">
                                  <Image
                                  src={FullDrop}
                                  alt="Water level"
                                  width={20}
                                  height={20}
                                  className="w-4 h-4 mr-2"
                                  style={{ objectFit: "cover" }}
                                  loading="lazy"
                                  />
                                  <span className="text-gray-600 whitespace-nowrap truncate text-sm font-bold">Water level needed :</span>
                                    <span className="text-primary text-sm font-bold ml-2 whitespace-nowrap truncate">{selectedPlant?.model.waterLvlNeeded}/5</span>
                                </div>

                                <div className="flex">
                                  <Sun color="#ffc524" className="w-5 mr-2"/>
                                  <span className="text-gray-600 whitespace-nowrap truncate text-sm font-bold">Sun level :</span>
                                    <span className="text-primary text-sm font-bold ml-2 whitespace-nowrap truncate">{selectedPlant?.model.sunLvlNeeded}</span>
                                </div>

                                <div className="flex">
                                  <Shell color="#392604" className="w-5 mr-2"/>
                                  <span className="text-gray-600 whitespace-nowrap truncate text-sm font-bold">Soil :</span>
                                    <span className="text-primary text-sm font-bold ml-2 whitespace-normal w-[50%]">{selectedPlant.model.soil}</span>
                                </div>

                                <div className="flex">
                                  <Thermometer color="#944efd" className="w-5 mr-2"/>
                                  <span className="text-gray-600 whitespace-nowrap truncate text-sm font-bold">Temperature :</span>
                                    <span className="text-primary text-sm font-bold ml-2 whitespace-nowrap truncate">{selectedPlant.model.temperature}</span>
                                </div>

                                <div className="flex">
                                  <Bug color="#0b5b11" className="w-5 mr-2"/>
                                  <span className="text-gray-600 whitespace-nowrap truncate text-sm font-bold">Pest resistant :</span>
                                    <span className="text-primary text-sm font-bold ml-2 whitespace-nowrap truncate">{selectedPlant.model.pestResistant}</span>
                                </div>

                              </div>
                            </div>
                            <div className="flex flex-col w-[45%] h-auto">
                              <h3 className="text-primary text-lg font-bold">Care schedule</h3>
                              <div className="flex flex-col gap-2 w-full h-auto p-2 mt-4">

                                <div className="flex justify-between items-center w-full bg-water bg-opacity-30 py-4 px-2 rounded-lg">
                                  <span className="text-sm font-bold">Watering :</span>
                                  <span className="text-primary text-sm font-bold ml-2">
                                    {formatDistanceToNow(new Date(selectedPlant.nextWateringDate), { addSuffix: true })}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center w-full py-4 px-2 ">
                                  {/* send email with resend */}
                                  <span className="text-sm font-bold">Receive water alert by mail :</span>
                                  <SwitchButton value={selectedPlant.sendWaterMailAlert} />
                                  <span className="text-primary text-sm font-bold ml-2"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full h-auto p-4">
                            <h3 className="text-primary text-lg font-bold">Notes</h3>
                            <div className="w-full h-auto p-2 bg-gray-100 rounded-lg mt-4">
                              <p className="text-gray-700 text-sm font-bold">Lorem ipsum dolor amet</p>

                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
            )}
          </div>
        </section>
    )
}
