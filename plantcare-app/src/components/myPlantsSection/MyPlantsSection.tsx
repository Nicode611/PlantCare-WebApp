import { formatDistanceToNow } from "date-fns";


// Auth
import { useSession } from "next-auth/react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { select } from "@/redux/slices/plants/selectPlantSlice";
import { open } from "@/redux/slices/modalSlice";

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
import { MapPin } from "lucide-react";


// Lucide
import { ChevronRight } from "lucide-react"

// Shadcn
import { Button } from "@/components/ui/button"

/// Components
import AddPlantModal from "../modals/AddPlantModal";
import EditPlantModal from "../modals/EditPlantModal";
import DeletePlantModal from "../modals/DeletePlantModal";
import SwitchButton from "@/components/ui/switchButton/SwitchButton";
import UnselectedPlant from "../fallbacks/UnselectedPlant";

export default function MyPlantsSection() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const plants = useSelector((state: RootState) => state.allThePlants.value);

    const { activeModal, modalProps } = useSelector((state: RootState) => state.modal);
    const selectedAction = (modalProps as { actionName?: string }).actionName;

    // Mode thème - Light ou Dark selon la préférence utilisateur
    const isDarkMode = session?.user.theme === "dark";

    return (
        <section 
            className={`w-full h-screen flex flex-col justify-start items-center p-5 z-50 backdrop-blur-md ${isDarkMode ? "bg-bgDarkSection/50" : "bg-white/50"}`}
            style={{ overscrollBehaviorX: "contain", backdropFilter: "blur(5px)" }}
        >
          {activeModal === "plant" && selectedAction === "add" && (
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/50 z-50">
              <AddPlantModal />
            </div>
          )}
          {activeModal === "plant" && selectedAction === "edit" && selectedPlant && (
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/50 z-50">
              <EditPlantModal />
            </div>
          )}
          {activeModal === "plant" && selectedAction === "delete" && selectedPlant && (
            <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/50 z-50">
              <DeletePlantModal selectedPlant={selectedPlant} />
            </div>
          )}
          <div className='w-full h-auto flex justify-between items-center px-10 py-5'>
            <div className='flex flex-col justify-center items-start'>
              <h2 className={`${isDarkMode ? "text-secondary" : "text-primary"} text-3xl font-bold`}>My plants</h2>
              <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} font-bold`}>Manage all your lovely plants in one place.</span>
            </div>
            <button className={`${isDarkMode ? "bg-secondary text-black" : "bg-primary text-white"} text-sm rounded-lg px-4 py-2 hover:opacity-80 transition-all duration-300 ease-in-out`} onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>+ Add a plant</button>
          </div>
          <div className="w-full h-auto">
            {status === "loading" ? (
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
                        <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Merci de vous reconnecter</p>
                    </nav>
            ) : ( 
                // Affichage des plantes
                <div className="flex flex-col md:flex-row justify-around gap-4 p-4 mt-4">
                    <div className={`flex flex-col items-start justify-center w-full h-full ${isDarkMode ? "bg-bgDarkSection" : "bg-white"} rounded-lg shadow-md md:w-[25%] p-2 py-4`}>
                      <input type="text" placeholder="Search" className={`w-full p-2 mb-4 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`} />
                      {plants.length > 0 ? (
                          plants.map((plant) => (
                              <div key={plant.id} className={`overflow-x-hidden flex items-center w-full p-2 ${isDarkMode ? "bg-bgDarkSection" : "bg-white"} rounded-lg my-2 hover:cursor-pointer ${selectedPlant && plant.id === selectedPlant.id ? isDarkMode ? "bg-secondary/30 border border-secondary/50" : "bg-primary/20 border border-primary/50" : ""}`} onClick={() => {dispatch(select(plant))}}>
                                  <div className="flex items-center gap-2 w-[80%]">
                                    <Image
                                    src={plant.image !== null ? plant.image : `/images/plants-img/${plant.model.image}.png`}
                                    alt={plant.model.name}
                                    width={100}
                                    height={100}
                                    className="w-10 h-10 rounded-lg"
                                    style={{objectFit: plant.image !== null ? "cover" : "contain"}}
                                    loading="lazy"
                                    /> 
                                    <div className="flex flex-col w-[80%]">
                                      <h3 className={`text-xs ${isDarkMode ? "text-secondary" : "text-primary"} whitespace-nowrap truncate w-[80%] font-semibold`}>{plant.model.name}</h3>
                                      <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"} opacity-80 text-left`}>{plant.location}</p>
                                    </div>
                                  </div>
                                  <div className="w-[20%]">
                                    <Button size={"icon"} className={`${isDarkMode ? "bg-secondary/0 hover:bg-secondary/0 text-secondary" : "bg-primary/0 hover:bg-primary/0 text-primary"} shadow-none`}>
                                      <ChevronRight />
                                    </Button>
                                  </div>
                              </div>
                          ))
                      ) : (
                          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Aucune plante trouvée.</p>
                      )}
                    </div>
                    <div className={`flex flex-col items-center justify-center w-full h-full ${isDarkMode ? "bg-bgDarkSection" : "bg-white"} rounded-lg shadow-md md:w-[75%]`}>
                      {selectedPlant == null ? (
                        <div className={`h-full w-full ${isDarkMode ? "bg-bgDarkSection text-white" : "bg-white text-black"}`}>
                          <UnselectedPlant />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-full">
                          <div className={`flex items-center justify-between w-full p-2 ${isDarkMode ? "bg-bgDarkSection" : "bg-white"}`}>
                            <div className="flex items-center gap-2 w-full">
                              <Image
                              src={selectedPlant.image !== null ? selectedPlant.image : `/images/plants-img/${selectedPlant.model.image}.png`}
                              alt={selectedPlant?.model.name}
                              width={100}
                              height={100}
                              className="w-24 h-24 mb-2 rounded-lg border-[1px] border-primary/10"
                              style={{objectFit: selectedPlant.image !== null ? "cover" : "contain"}}
                              loading="lazy"
                              /> 
                              <div className="flex flex-col w-[80%]">
                                <h3 className={`text-xl ${isDarkMode ? "text-secondary" : "text-primary"} whitespace-nowrap truncate w-[80%] font-semibold`}>{selectedPlant.model.name}</h3>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4" color={isDarkMode ? "#AACCA6" : "#277A1C"} />
                                  <span className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{selectedPlant.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center pr-5">
                              <button className={`flex items-center ${isDarkMode ? "bg-secondary/30 text-secondary" : "bg-secondary bg-opacity-40 text-primary"} font-bold text-xs lg:text-sm rounded-lg px-2 py-1 hover:bg-primary/80 hover:text-white transition-all duration-300 ease-in-out`} onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "edit" } }))}}>
                                <SquarePen color={isDarkMode ? "#AACCA6" : "#0b5b11"} className="w-4 mr-2" />
                                Edit
                              </button>
                              <button className="flex items-center bg-red-500 bg-opacity-40 text-red-600 font-bold text-xs rounded-lg px-2 py-1 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out ml-2" onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "delete" } }))}}>
                                <Trash2 color="#be0e0e" className="w-4 lg:w-5 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                          <div className={`flex justify-around w-full h-full gap-4 p-4 ${isDarkMode ? "text-white" : "text-black"}`}>
                            <div className="flex flex-col w-[55%] h-auto">
                              <h3 className={`${isDarkMode ? "text-secondary" : "text-primary"} text-lg font-bold`}>Plant details</h3>
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                
                                <div className="flex items-center">
                                  <Image
                                  src={FullDrop}
                                  alt="Water level"
                                  width={20}
                                  height={20}
                                  className="w-4 h-4 mr-2 object-cover"
                                  loading="lazy"
                                  />
                                    <div className="flex flex-col">
                                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} whitespace-nowrap truncate text-xs`}>Water level needed</span>
                                      <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold whitespace-nowrap truncate`}>{selectedPlant?.model.waterLvlNeeded}/5</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                  <Sun color={isDarkMode ? "#ffd54f" : "#ffc524"} className="w-5 mr-2"/>
                                    <div className="flex flex-col">
                                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} whitespace-nowrap truncate text-xs`}>Sun level :</span>
                                      <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold whitespace-nowrap truncate`}>{selectedPlant?.model.sunLvlNeeded}/100</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                  <Bug color={isDarkMode ? "#AACCA6" : "#0b5b11"} className="w-5 mr-2"/>
                                    <div className="flex flex-col">
                                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} whitespace-nowrap truncate text-xs`}>Pest resistant :</span>
                                      <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold whitespace-nowrap truncate`}>{selectedPlant.model.pestResistant}</span>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                  <Thermometer color={isDarkMode ? "#b78dff" : "#944efd"} className="w-5 mr-2"/>
                                    <div className="flex flex-col">
                                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} whitespace-nowrap truncate text-xs`}>Temperature :</span>
                                      <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold whitespace-nowrap truncate`}>{selectedPlant.model.temperature}</span>
                                    </div>
                                </div>
                              </div>
                              <div className="flex w-full mt-4 items-center">
                                <Shell color={isDarkMode ? "#b38b50" : "#392604"} className="w-5 mr-2"/>
                                <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{selectedPlant.model.soil}</span>
                              </div>
                            </div>
                            <div className="flex flex-col w-[45%] h-auto">
                              <h3 className={`${isDarkMode ? "text-secondary" : "text-primary"} text-lg font-bold`}>Care schedule</h3>
                              <div className="flex flex-col gap-2 w-full h-auto p-2 mt-4">

                                <div className="flex justify-between items-center w-full bg-water bg-opacity-30 py-4 px-2 rounded-lg">
                                  <span className={`text-sm font-bold ${isDarkMode ? "text-white" : ""}`}>Watering :</span>
                                  <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold ml-2`}>
                                    {formatDistanceToNow(new Date(selectedPlant.nextWateringDate), { addSuffix: true })}
                                  </span>
                                </div>

                                <div className="flex justify-between items-center w-full py-4 px-2 ">
                                  {/* send email with resend */}
                                  <span className={`text-sm font-bold ${isDarkMode ? "text-white" : ""}`}>Receive water alert by mail :</span>
                                  {/* Repair the switch button to toggle email alert */}
                                  <SwitchButton checked={selectedPlant.sendWaterMailAlert} onCheckedChange={""} />
                                  <span className={`${isDarkMode ? "text-secondary" : "text-primary"} text-sm font-bold ml-2`}></span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-full h-auto p-4">
                            <h3 className={`${isDarkMode ? "text-secondary" : "text-primary"} text-lg font-bold`}>Notes</h3>
                            <div className={`w-full h-auto p-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg mt-4`}>
                              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-sm font-bold`}>
                                {/* Contenu des notes */}
                              </p>
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
