import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";

const Calendar = () => {
  return (
    <>
      <FullCalendar
        locale="id"
        firstDay={1}
        plugins={[dayGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            title: "Kegiatan 1",
            start: "2023-11-25T10:00:00",
            end: "2023-11-25T12:00:00",
            editable: true,
          },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,listMonth",
        }}
      />
    </>
  );
};

export default Calendar;
