import { useState } from "react";
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
  const createEvent = (i) => {
    setInitialEventTime(i);
    toggleCreateEventModal();
  };

  const [focusedEvent, setFocusedEvent] = useState({});
  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const toggleEditEventModal = () => {
    if (createEventModalOpen) toggleCreateEventModal();
    setEditEventModalOpen(!editEventModalOpen);
  };
  const editEvent = (event) => {
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
        <article
          onClick={() => editEvent(event)}
          className="bg-red-100 absolute ml-8 w-full p-2 rounded-lg"
          style={{
            top: `${event.startTime * 2.5}rem`,
            height: `${(event.endTime - event.startTime) * 2.5}rem`,
          }}
        >
          <div className="flex gap-x-2">
            <span className="font-medium">{event.title}</span>
            <span>
              {event.startTime}-{event.endTime}
            </span>
          </div>
        </article>
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
