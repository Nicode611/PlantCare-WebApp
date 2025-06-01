"use client";
// CSS
import "../../styles/dashboard.css";

// Composants
import Sidebar from "@/components/Sidebar";
import CookieConsent from "react-cookie-consent";


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="swip flex w-screen h-screen overflow-hidden bg-[#f5f5f5]">
            <div className="flex flex-col md:flex-row w-screen h-full overflow-hidden">
                <CookieConsent
                  location="bottom"
                  buttonText="J'accepte"
                  declineButtonText="Je refuse"
                  cookieName="mySiteCookieConsent"
                  style={{ background: "#E8E8E8", color: "black", border: "1px solid #277A1C" }}
                  buttonStyle={{ background: "#277A1C", color: "white", fontSize: "13px" }}
                  expires={150}
                >
                  Ce site utilise des cookies pour améliorer votre expérience.
                </CookieConsent>

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
