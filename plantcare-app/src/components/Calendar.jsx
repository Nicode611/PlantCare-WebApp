"use client"; // Nécessaire pour Next.js App Router

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // Pour le drag & drop
import "../styles/calendar.css"

export default function MyCalendar() {
  const [events, setEvents] = useState([
    { title: "Watering", start: new Date(new Date().setDate(new Date().getDate() + 1)) },
  ]);

  return (
    <div className="p-4 h-[70%] w-[80%] bg-white rounded-lg shadow-md z-[100]">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
            left: "prev,next today",
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