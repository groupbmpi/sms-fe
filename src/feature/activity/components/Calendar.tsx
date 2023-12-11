import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Calendar = ({ events }: { events: EventSourceInput }) => {
  const navigate = useNavigate();

  const [eventList, setEventList] = useState<EventSourceInput>([]);

  const calendarRef = React.createRef<FullCalendar>();

  const handleOnClick = (e: EventClickArg) => {
    const editable = e.event.startEditable;

    if (editable) {
      navigate(`/activity/${e.event.id}`);
    }
  };

  useEffect(() => {
    setEventList(events);
    console.log(events);
  }, [events]);

  return (
    <>
      <FullCalendar
        locale="id"
        ref={calendarRef}
        firstDay={1}
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={eventList}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,listMonth",
        }}
        eventClick={handleOnClick}
        dayMaxEventRows={true}
        dayMaxEvents={true}
      />
    </>
  );
};
