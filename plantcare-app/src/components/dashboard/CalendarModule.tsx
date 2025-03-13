"use client"; // Nécessaire pour Next.js App Router

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Pour le drag & drop

// CSS
import "../../styles/calendar.css"

export default function MyCalendar() {
  const [events, setEvents] = useState([
    { title: "Watering", start: new Date(new Date().setDate(new Date().getDate() + 1)) },
  ]);

  return (
    <div className="font-sans p-4 h-[100%]  bg-[#f5f5f5] border border-b border-[#21301a] rounded-lg shadow-lg z-[100]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "", // Choix des vues
          }}
        firstDay={1} // Par défaut, c'est dimanche (0)
        events={events}
        displayEventTime={false}
        editable={true} // Active le drag & drop
        selectable={true} // Permet de sélectionner des dates
        eventClick={(info) => {
            console.log(info);
          }}
        dateClick={(info) =>
          setEvents([...events, { title: "Nouvel événement", start: info.date }])
        }
      />
    </div>
  );
}