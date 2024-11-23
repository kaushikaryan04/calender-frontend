import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axiosInstance from "../axiosInstance";

const localizer = momentLocalizer(moment);
const eventStyleGetter = (event) => ({
  style: { backgroundColor: "#3174ad", color: "white", borderRadius: "5px" },
});

const CalendarComponent = () => {
  // const [events, setEvents] = useState([
  //   {
  //     id: 1,
  //     title: "Meeting",
  //     start: new Date(2024, 11, 21, 10, 0), // Dec 21, 2024, 10:00 AM
  //     end: new Date(2024, 11, 21, 11, 0), // Dec 21, 2024, 11:00 AM
  //   },
  //   {
  //     id: 2,
  //     title: "Meeting 2",
  //     start: new Date(2024, 11, 1, 10, 0),
  //     end: new Date(2024, 11, 1, 11, 0),
  //   },
  // ]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
    const fetchEvents = async () => {
      const res = await axiosInstance.get("api/event/");
      console.log(res.data);
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    navigate(`/edit-event/${event.id}`, { state: { event } });
  };

  const handleAddEvent = () => {
    navigate("/add-event");
  };

  return (
    <div>
      <button
        onClick={handleAddEvent}
        style={{
          marginBottom: "10px",
          padding: "10px 20px",
          backgroundColor: "#3174ad",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add New Event
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default CalendarComponent;
