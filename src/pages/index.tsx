import { useState } from "react";

export default function Home() {
  const createEvent = (i) => {
    setInitialEventTime(i);
    setCreateEventModalOpen(true);
  };

  const editEvent = (event) => {
    setFocusedEvent(event);
    setEditEventModalOpen(true);
  };
  const [focusedEvent, setFocusedEvent] = useState({});

  const [editEventModalOpen, setEditEventModalOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [initialEventTime, setInitialEventTime] = useState(0);
  const [events, setEvents] = useState([
    {
      title: "interview",
      id: 0,
      startTime: 3,
      endTime: 5,
    },
  ]);

  return (
    <>
      <div className="relative">
        {[...Array(24)].map((x, i) => (
          <div key={i} className="pl-6 relative" onClick={() => createEvent(i)}>
            <div className="border-t border-b" style={{ height: "2rem" }}>
              <div className="absolute -top-3 left-0 pl-2">{i}</div>
            </div>
          </div>
        ))}

        {events.map((event) => (
          <div
            className="bg-red-100 absolute ml-6 p-2"
            onClick={() => editEvent(event)}
            style={{
              top: `${event.startTime * 2}rem`,
              height: `${(event.endTime - event.startTime) * 2}rem`,
            }}
          >
            <div>{event.title}</div>
          </div>
        ))}

        {createEventModalOpen && (
          <CreateEventModal
            initialEventTime={initialEventTime}
            events={events}
            setEvents={setEvents}
            isCreating={true}
          />
        )}

        {editEventModalOpen && (
          <CreateEventModal
            event={focusedEvent}
            events={events}
            setEvents={setEvents}
            isCreating={false}
          />
        )}
      </div>
    </>
  );
}

const CreateEventModal = ({
  initialEventTime,
  event,
  events,
  setEvents,
  isCreating,
}) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(initialEventTime);
  const [endTime, setEndTime] = useState(0);

  const updateEvents = (e) => {
    e.preventDefault();

    if (isCreating) {
      const newEvent = {
        title: title,
        id: events.length,
        startTime: startTime,
        endTime: endTime,
      };

      setEvents((prevEvents) => [...prevEvents, newEvent]);
      return;
    }

    // editting
    const idx = events.findIndex((e) => e.id == event.id);

    console.log(events[idx]);
  };

  return (
    <div className="absolute top-2/4 left-2/4 bg-zinc-200">
      <form onSubmit={updateEvents}>
        <div className="max-w-5xl mx-auto">
          {isCreating ? "Creating" : "Editting"} Event
        </div>

        <div className="flex flex-col">
          <input
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <button type="submit">Create event</button>
      </form>
    </div>
  );
};
