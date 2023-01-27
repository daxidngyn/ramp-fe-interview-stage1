import { useState } from "react";
import Event from "./Event";
import EventModal from "./EventModal";

export default function Calendar() {
  const [events, setEvents] = useState([
    {
      title: "interview",
      id: 0,
      startTime: 3,
      endTime: 5,
    },
  ]);

  const [initialEventTime, setInitialEventTime] = useState(0);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const toggleCreateEventModal = () => {
    if (editEventModalOpen) toggleEditEventModal();
    setCreateEventModalOpen(!createEventModalOpen);
  };
  const createEvent = (i: number) => {
    setInitialEventTime(i);
    toggleCreateEventModal();
  };

  const [focusedEvent, setFocusedEvent] = useState({});
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const toggleEditEventModal = () => {
    if (createEventModalOpen) toggleCreateEventModal();
    setEditEventModalOpen(!editEventModalOpen);
  };
  const editEvent = (event: any) => {
    setFocusedEvent(event);
    toggleEditEventModal();
  };

  return (
    <div className="relative mx-2">
      {[...Array(24)].map((x, i) => (
        <section
          key={i}
          className="pl-8 relative"
          onClick={() => createEvent(i)}
        >
          <div className="border-t" style={{ height: "2.5rem" }}>
            <div className="absolute -top-3 left-0 pl-2">{i}</div>
          </div>
        </section>
      ))}

      {events.map((event) => (
        <Event event={event} toggleModal={editEvent} />
      ))}

      {createEventModalOpen && (
        <EventModal
          isCreating={true}
          initialEventTime={initialEventTime}
          events={events}
          toggleModal={toggleCreateEventModal}
          setEvents={setEvents}
        />
      )}

      {editEventModalOpen && (
        <EventModal
          isCreating={false}
          event={focusedEvent}
          events={events}
          toggleModal={toggleEditEventModal}
          setEvents={setEvents}
        />
      )}
    </div>
  );
}
