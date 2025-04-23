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


    const [mounted, setMounted] = useState(false);
    const selectedPlant = useSelector((state: RootState) => state.selectPlant.value);
    const [event, setEvent] = useState<Event[]>([]);
    
    useEffect(() => {
        if (!selectedPlant) {
            setEvent([]);
            return;
        }

        // Return dates Array with every days between startDate and endDate
        function generateDatesEveryNDays(startDate: Date, endDate: Date, stepDays: number): Date[] {
            const dates: Date[] = [];
            let current = new Date(startDate);
            while (current <= endDate) {
                dates.push(new Date(current));
                current = new Date(current.getTime() + stepDays * 24 * 60 * 60 * 1000);
            }
            return dates;
        }

        // startDate = selectedPlant.lastWateredAt
        const startDate = new Date(selectedPlant.lastWateredAt);
        // endDate = startDate + 2 months
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 2);
        
        // Utilise la fréquence d'arrosage du modèle de la plante
        const stepDays = selectedPlant.model.wateringFrequency;
        const dates = generateDatesEveryNDays(startDate, endDate, stepDays);

        const startTimestamp = startDate.getTime();
        const needWaterEvents = dates.map(date => {
        const isFirst = date.getTime() === startTimestamp;

        return {
          title: (
            <div className="h-5 w-5 inline-block overflow-hidden animate-fill-up">
              <Droplet
                strokeWidth={1.75}
                fill={isFirst ? "#0082ff" : "#bfe0ff"}
                color="white"
                className="h-full w-full"
              />
            </div>
          ),
          start: date,
          tooltip: isFirst ? "Watered" : "Need water"
        };
      });
      setEvent(needWaterEvents);
    }, [selectedPlant]);

    
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
                        tooltip: e.tooltip
                    },
                }))}
                displayEventTime={false}
                editable={true}
                selectable={true}
                eventContent={(eventInfo) => {
                    return (
                        <div title={eventInfo.event.extendedProps.tooltip} className="w-full h-full text-center">
                        {eventInfo.event.extendedProps.customTitle}
                        </div>
                    );
                }}
                eventClick={() => {
                }}
            />
        </div>
  );
}