import { useEffect, useState } from "react";
import Image from "next/image";

import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux";
import { open } from "@/redux/slices/modalSlice";

import type { RootState } from "@/redux/store";
import { getPlantsFromUser } from "@/lib/api";
import AddPlantModal from "../modals/AddPlantModal";

import { Plant } from "@/types/plant";

export default function MyPlantsSection() {
    const { data: session, status } = useSession();

    const dispatch = useDispatch();

    const updatePlants = useSelector((state: RootState) => state.updatePlants.value);
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
          <div className='w-full h-auto flex  justify-between items-center px-10 py-5 bg-background rounded-md border-[1px] border-primary shadow-md'>
            <div className='flex flex-col justify-center items-start'>
              <h2 className='text-primary text-4xl font-bold'>My plants</h2>
              <span className='text-gray-600 font-bold'>Manage all your lovely plants in one place.</span>
            </div>
            <button className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/80 transition-all duration-300 ease-in-out' onClick={() => {dispatch(open({ modal: "plant", props: { actionName: "add" } }))}}>+ Add a plant</button>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-4">
                    {plants.length > 0 ? (
                        plants.map((plant) => (
                            <div key={plant.id} className="w-full p-4 bg-white rounded-lg shadow-md mb-4">
                                <Image
                                src={`/images/plants-img/${plant.model.image}.png`}
                                alt={plant.model.name}
                                width={100}
                                height={100}
                                className="w-16 h-16 rounded-full mb-2"
                                style={{ objectFit: "cover" }}
                                loading="lazy"
                                /> 
                                <h3 className="text-lg font-semibold">{plant.model.name}</h3>
                                <p className="text-gray-600">{plant.location}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Aucune plante trouvée.</p>
                    )}
                </div>
            )}
          </div>
        </section>
    )
}
