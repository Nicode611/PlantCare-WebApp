

// CSS
import "../../styles/dashboard.css";

// Composants
import Sidebar from "@/components/Sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="swip flex w-screen h-screen overflow-hidden bg-[#f5f5f5]">
            <div className="flex flex-col md:flex-row w-screen h-full overflow-hidden">
                
                {/* Sidebar - chargé en même temps que le layout */}
                <div className="relative h-12 md:w-[20%] md:h-full md:min-w-44 md:max-w-[300px] w-full z-50">
                    <Sidebar />
                </div>

                {/* Contenu principal - enfants du layout */}
                {children}
            </div>
        </div>
    );
}
