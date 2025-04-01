"use client"; 

// React
import { useState, useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// CSS
import "../../styles/calendar.css"

// FullCalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Drag & drop

// Lucide
import { Droplet } from "lucide-react";

// Components
import UnselectedPlant from "../fallbacks/UnselectedPlant";

// Types
import { Event } from "@/types/event";

export default function MyCalendar() {
    // Flag de montage 
    useEffect(() => {
      setMounted(true);

    }, []);

    
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const [mounted, setMounted] = useState(false);
    
    const [event, setEvent] = useState<Event[]>([]);
    
    useEffect(()=>{
        const lastWatered = selectedPlant ? [{ title: <Droplet strokeWidth={1.75} fill="#088193" color="white" className="h-5 w-5 inline-block"/>, start: new Date(selectedPlant.lastWateredAt) }] : []
        setEvent(lastWatered)
    }, [selectedPlant])

    
    if (!mounted) return null;
    if (!selectedPlant) { return <UnselectedPlant/> }

  return (
        <div className="font-sans p-4 h-[100%]  bg-[#f5f5f5] rounded-lg z-[100]">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "",
                }}
                firstDay={1}
                events={event.map(e => ({
                    start: e.start,
                    extendedProps: {
                        customTitle: e.title,
                    },
                }))}
                displayEventTime={false}
                editable={true}
                selectable={true}
                eventContent={(eventInfo) => {
                    return (
                        <div className="w-full h-full text-center">
                        {eventInfo.event.extendedProps.customTitle}
                        </div>
                    );
                }}
                eventClick={(info) => {
                    console.log(info);
                }}
            />
        </div>
  );
}