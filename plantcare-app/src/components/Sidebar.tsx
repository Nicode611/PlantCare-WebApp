"use client"

// Next
import Image from "next/image"
import { useEffect } from "react";

// Redux
import type { RootState } from "@/redux/store"
import { useSelector, useDispatch } from "react-redux"
import { useRouter } from 'next/navigation';
import { changeSection } from "@/redux/slices/activeSection"
import { unselect } from "@/redux/slices/plants/selectPlantSlice"
import { setPlants, clearPlants } from "@/redux/slices/plants/allThePlantsSlice";

// API 
import { getPlantsFromUser } from "@/lib/api/plants"

// Components
import ThemeButton from "./ThemeButton"

// Auth.JS
import { useSession, signOut } from 'next-auth/react';

import * as Tooltip from "@radix-ui/react-tooltip";


function Sidebar() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();

    // Sélecteurs Redux
    const plants = useSelector((state: RootState) => state.allThePlants.value);
    const activeSection = useSelector<RootState, string>((state) => state.activeSection.activeSection);

    useEffect(() => {
      if (status === "authenticated" && session?.user?.id && plants.length === 0) {
        getPlantsFromUser(session.user.id).then((fetchedPlants) => {
          dispatch(setPlants(fetchedPlants));
        });
      }
    }, [status, session?.user?.id, plants.length, dispatch]);

    // Quand l’utilisateur est déconnecté, on vide le slice des plantes
    useEffect(() => {
      if (status === "unauthenticated") {
        dispatch(clearPlants());
      }
    }, [status, dispatch]);

    

    
    // Toujours afficher la structure de base, même pendant le chargement
    return (
        <div className={`w-full h-full flex md:flex-col justify-start md:justify-between items-center ${session?.user.theme === "light" ? "bg-bgLight" : "bg-bgDark" }  shadow-spread`}>
            <div className="flex md:flex-col items-center w-full">
                <div className={`flex justify-start md:justify-center items-center h-full md:w-full ml-5 md:mx-0 md:py-5 border-b ${session?.user.theme === "light" ? "bg-[#dfdfdf] border-gray-300" : "bg-[#2f2f2f] border-black" }`}>
                    <svg className="w-[30px] md:w-[40px] h-auto" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 544 544" enableBackground="new 0 0 544 544">
                        <path fill={`${session?.user.theme === "light" ? "#000000": "#ffffff" }`} opacity="1.000000" stroke="none" d=" M28.468658,545.000000   C20.189770,540.190125 18.859058,532.728027 18.866772,524.283264   C18.960863,421.292480 19.017075,318.301361 18.779449,215.311005   C18.754047,204.301682 22.224247,196.992386 31.655109,190.470825   C91.121819,149.348740 150.139893,107.577843 209.305573,66.020462   C228.393112,52.613571 247.569641,39.330833 266.528412,25.744263   C276.447998,18.635508 287.185974,18.585068 297.427582,25.402973   C363.712158,69.529037 430.236481,113.294930 496.683105,157.177612   C510.029541,165.991882 523.365967,174.821396 536.735840,183.600006   C541.114319,186.474884 543.388733,190.360855 543.386719,195.669113   C543.369751,240.934601 543.400635,286.200104 543.405823,331.465576   C543.413391,396.626953 543.318604,461.788635 543.540039,526.949280   C543.565552,534.448792 541.754822,540.311707 535.209045,544.740479   C366.312439,545.000000 197.624878,545.000000 28.468658,545.000000  M242.713760,282.221039   C236.518555,288.962555 230.334961,295.714783 224.125885,302.443451   C208.090912,319.820221 192.076126,337.215881 175.962570,354.519531   C173.977371,356.651337 173.282944,358.858093 173.286392,361.689789   C173.346497,411.012787 173.399689,460.336090 173.238205,509.658630   C173.221954,514.625000 174.943298,515.789429 179.595490,515.785339   C287.403748,515.690735 395.212158,515.729309 503.020538,515.727539   C510.080444,515.727417 510.646271,515.110291 510.646545,507.974701   C510.650269,408.995300 510.604584,310.015808 510.764313,211.036652   C510.773468,205.373474 508.975372,201.952866 504.238403,198.878296   C476.296661,180.742432 448.528290,162.339050 420.729889,143.982849   C376.393372,114.705963 332.052216,85.435890 287.799927,56.032139   C283.700775,53.308437 280.657104,53.476082 276.670715,56.314129   C249.804855,75.440742 222.790329,94.358696 195.808472,113.322205   C149.615372,145.787842 103.429161,178.263412 57.174534,210.641220   C53.701805,213.072083 52.217747,215.710007 52.250698,220.095520   C52.548611,259.748474 52.705357,299.403290 52.695915,339.057526   C52.682503,395.374481 52.491329,451.691376 52.381939,508.008301   C52.368492,514.931458 53.172054,515.721436 60.154583,515.722107   C84.315086,515.724243 108.475601,515.726685 132.636093,515.713074   C139.666519,515.709106 139.732346,515.641541 139.732468,508.868744   C139.733368,460.379150 139.727982,411.889587 139.706482,363.399994   C139.705750,361.741730 139.811554,359.996796 139.358780,358.440308   C137.410797,351.743683 139.704391,346.593689 144.312088,341.708435   C158.251114,326.929749 171.948807,311.923615 185.762787,297.026764   C206.033569,275.166962 226.328659,253.329727 246.598114,231.468704   C248.799576,229.094406 251.336594,227.376923 254.465179,226.395874   C261.992798,224.035416 270.793823,226.570923 274.657776,232.357758   C278.537170,238.167786 277.263062,245.121826 271.118744,251.723480   C261.815399,261.719238 252.516098,271.718719 242.713760,282.221039  z"/>
                        <path fill="#13810B" opacity="1.000000" stroke="none" d=" M238.793610,313.812775   C256.142334,294.895752 273.349396,276.328827 290.323578,257.551422   C293.373962,254.176971 295.335846,254.144196 298.786591,256.991333   C319.599701,274.163788 331.597656,295.471375 329.167480,323.055145   C327.455353,342.488647 317.451691,357.679657 301.477600,368.441162   C275.378357,386.023956 247.123505,387.319122 217.844116,377.831787   C210.847687,375.564728 204.293274,372.251465 197.987717,368.488007   C192.248917,365.062805 192.261154,364.630890 196.714584,359.778595   C210.680618,344.561707 224.621613,329.321838 238.793610,313.812775  z"/>
                    </svg>
                    <h1 className={`ml-3 text-[1.3rem] md:text-[1.5rem] font-bold ${session?.user.theme === "light" ? "text-black": "text-white" }`}>PlantCare</h1>
                </div>
                {status === "loading" ? (
                    // Animation de chargement élégante pendant le chargement
                    <nav className="hidden md:flex flex-col items-center justify-center w-[100%] md:mt-5">
                        <div className="flex flex-col items-center w-full py-10">
                            <div className="relative w-10 h-10">
                                <div className="absolute top-0 left-0 w-full h-full border-4 border-[#98C496] border-opacity-20 rounded-full"></div>
                                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#08740C] rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-4 text-[#08740C] font-medium">Chargement...</p>
                        </div>
                    </nav>
                ) : status !== "authenticated" || !session?.user ? (
                    // En cas d'erreur d'authentification
                    <nav className="hidden md:flex flex-col items-center justify-center w-[100%] md:mt-5">
                        <p className="text-sm text-gray-500">Merci de vous reconnecter</p>
                    </nav>
                ) : (
                    // Navigation normale quand les données sont disponibles
                    <nav className={`hidden md:flex flex-col items-start w-[100%] md:mt-5 ${session?.user.theme === "light" ? "text-black" : "text-white" }`}>
                        <ul className="list-none flex flex-col w-full">
                            <li className="flex justify-center m-2" onClick={() => dispatch(changeSection("dashboard"))}>
                                <div
                                  className={`flex justify-start items-center p-1 rounded-sm hover:bg-[#98C496] hover:bg-opacity-80 hover:cursor-pointer  w-[90%] ${
                                    activeSection === "dashboard" ? `bg-secondary bg-opacity-80 ${session?.user.theme === "light" ? " text-[#08740C] hover:text-[#08740C]" : "hover:text-white text-white " }` : ""
                                  }`}
                                >
                                    <Image
                                    src={"/icons/dashboard.svg"}
                                    alt="Dashboard icon"
                                    width={20}
                                    height={20}
                                    className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                    />
                                    <span>Dashboard</span>
                                </div>
                            </li>
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <li className="flex justify-center m-2 opacity-50 cursor-not-allowed" /* onClick={() => dispatch(changeSection("tasks"))} */>
                                    <div
                                      className={`flex justify-start items-center p-1 rounded-sm w-[90%] ${
                                        activeSection === "tasks" ? "bg-[#98C496] bg-opacity-80 text-[#08720C]" : ""
                                      }`}
                                    >
                                      <Image
                                        src={'/icons/today.svg'}
                                        alt="Task icon"
                                        width={20}
                                        height={20}
                                        className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                      />
                                      <span>Tasks</span>
                                    </div>
                                  </li>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content side="right" align="center" className="bg-gray-800 text-white px-2 py-1 rounded text-sm z-50">
                                    ⏳ Available soon
                                    <Tooltip.Arrow className="fill-gray-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <li className="flex justify-center m-2 opacity-50 cursor-not-allowed" /* onClick={() => dispatch(changeSection("caring"))} */>
                                <div
                                  className={`flex justify-start items-center p-1 rounded-sm w-[90%] ${
                                    activeSection === "caring" ? "bg-[#98C496] bg-opacity-80 text-[#08720C]" : ""
                                  }`}
                                >
                                    <Image
                                    src={"/icons/caring.svg"}
                                    alt="Caring icon"
                                    width={20}
                                    height={20}
                                    className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                    />
                                    <span>Caring space</span>
                                </div>
                            </li>
                            </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content side="right" align="center" className="bg-gray-800 text-white px-2 py-1 rounded text-sm z-50">
                                    ⏳ Available soon
                                    <Tooltip.Arrow className="fill-gray-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <li className="flex justify-center m-2 opacity-50 cursor-not-allowed" /* onClick={() => dispatch(changeSection("calendar"))} */>
                                <div
                                  className={`flex justify-start items-center p-1 rounded-sm w-[90%] ${
                                    activeSection === "calendar" ? "bg-[#98C496] bg-opacity-80 text-[#08720C]" : ""
                                  }`}
                                >
                                    <Image
                                    src={"/icons/calendar.svg"}
                                    alt="Calendar icon"
                                    width={20}
                                    height={20}
                                    className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                    />
                                    <span>Calendar</span>
                                </div>
                            </li>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content side="right" align="center" className="bg-gray-800 text-white px-2 py-1 rounded text-sm z-50">
                                    ⏳ Available soon
                                    <Tooltip.Arrow className="fill-gray-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <li className="flex justify-center m-2 opacity-50 cursor-not-allowed" /* onClick={() => dispatch(changeSection("diseases"))} */>
                                <div
                                  className={`flex justify-start items-center p-1 rounded-sm w-[90%] ${
                                    activeSection === "diseases" ? "bg-[#98C496] bg-opacity-80 text-[#08720C]" : ""
                                  }`}
                                >
                                    <Image
                                    src={"/icons/disease.svg"}
                                    alt="Disease icon"
                                    width={20}
                                    height={20}
                                    className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                    />
                                    <span>Diseases</span>
                                </div>
                            </li>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content side="right" align="center" className="bg-gray-800 text-white px-2 py-1 rounded text-sm z-50">
                                    ⏳ Available soon
                                    <Tooltip.Arrow className="fill-gray-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                            <li className="flex justify-center m-2" onClick={() => dispatch(changeSection("plants"))}>
                                <div
                                  className={`flex justify-start items-center p-1 rounded-sm hover:bg-[#98C496] hover:bg-opacity-80 hover:cursor-pointer w-[90%] ${
                                    activeSection === "plants" ?  `bg-secondary bg-opacity-80 ${session?.user.theme === "light" ? " text-[#08740C] hover:text-[#08740C]" : "hover:text-white text-white " }` : ""
                                  }`}
                                >
                                    <Image
                                    src={"/icons/plants.svg"}
                                    alt="Plants icon"
                                    width={20}
                                    height={20}
                                    className={`mr-3 ${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" } `}
                                    />
                                    <span>My plants</span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
            <div className="hidden md:flex md:flex-col md:w-full">
                {status === "loading" ? (
                    // Animation de chargement élégante pour la partie inférieure
                    <div className="flex flex-col items-center justify-center w-full min-h-[100px]">
                        <div className="flex space-x-2 justify-center items-center">
                            <div className="h-2 w-2 bg-[#08740C] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-[#08740C] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-[#08740C] rounded-full animate-bounce"></div>
                        </div>
                    </div>
                ) : status === "authenticated" && session?.user ? (
                    // Zone utilisateur normale quand les données sont disponibles
                    <div className={`flex flex-col items-center w-full ${session?.user.theme === "light" ? "text-black" : "text-white" }`}>
                        <div className="flex justify-center items-center gap-2 w-[90%] mb-5 hover:cursor-pointer" onClick={() => router.push('../settings') }>
                            <div className="w-[30px] h-[30px] flex rounded-full border border-black">
                                <Image
                                    src={session.user.image ?? '/default-avatar.png'}
                                    alt="User icon"
                                    width={30}
                                    height={30}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <span className="text-lg">{session.user.name}</span>
                        </div>
                        <div className="flex justify-start w-[100%] bg-primary shadow-md p-2">
                            <Image
                            src={"/icons/settings-white.svg"}
                            alt="Settings icon"
                            width={30}
                            height={30}
                            className="hover:cursor-pointer"
                            onClick={() => router.push('../settings') }
                            />
                            <div className="w-full flex items-center justify-end">
                                <span className="mr-2 text-[0.8rem] text-white">Dark mode</span>
                                <ThemeButton />
                            </div>
                        </div>
                        <div className={`py-5 w-full ${session?.user.theme === "light" ? "bg-[#E8E8E8]" : "bg-[#363636]" } hover:cursor-pointer`} onClick={() =>{ 
                              dispatch(clearPlants());
                              dispatch(unselect());
                              signOut({ callbackUrl: '/' })
                              }}>
                          <div className="flex justify-center items-center w-[90%]">
                              <div>
                                  <Image
                                      src={"/icons/log-out.svg"}
                                      alt="Log out icon"
                                      width={30}
                                      height={30}
                                      className={`${session?.user.theme === "light" ? "" : "filter  brightness-0 invert" }`}
                                  />
                              </div>
                              <span>Log out</span>
                          </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
export default Sidebar
