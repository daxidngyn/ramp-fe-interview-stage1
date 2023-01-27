import { useState } from "react";

export default function EventModal({
  isCreating,
  initialEventTime,
  event,
  events,
  setEvents,
  toggleModal,
}: {
  isCreating: boolean;
  initialEventTime?: number;
  event?: any;
  events: any;
  setEvents: any;
  toggleModal: () => void;
}) {
  const [title, setTitle] = useState(isCreating ? "" : event.title);
  const [startTime, setStartTime] = useState(
    isCreating ? initialEventTime : event.startTime
  );
  const [endTime, setEndTime] = useState(
    isCreating ? initialEventTime : event.endTime
  );
  const [err, setErr] = useState("");

  const updateEvents = (e: any) => {
    e.preventDefault();
    setErr("");

    if (!title) {
      setErr("You must input a valid title!");
      return;
    }
    if (!startTime || !endTime) {
      setErr("You must input a valid start time and end time!");
      return;
    }
    if (startTime == endTime) {
      setErr("Start and end time cannot be the same!");
      return;
    }
    if (
      !(startTime >= 0 && startTime <= 24) ||
      !(endTime >= 0 && endTime <= 24)
    ) {
      setErr("Start and end time must be in range!");
      return;
    }

    if (isCreating) {
      const newEvent = {
        title: title,
        id: events ? events.length : 0,
        startTime: startTime,
        endTime: endTime,
      };

      setEvents((prevEvents: any) => [...prevEvents, newEvent]);
      toggleModal();
      return;
    }

    // editting
    const prevEvents = events;
    const idx = prevEvents.findIndex((e: any) => e.id == event.id);

    prevEvents[idx].title = title;
    prevEvents[idx].startTime = startTime;
    prevEvents[idx].endTime = endTime;

    setEvents([...prevEvents]);

    console.log(prevEvents[idx]);
  };

  const deleteEvent = () => {
    const newEvents = events.filter((e: any) => e.id !== event.id);
    setEvents([...newEvents]);
    toggleModal();
  };

  return (
    <div
      className="shadow-lg drop-shadow-md rounded-lg absolute top-2/4 left-2/4 bg-zinc-100 max-w-2xl w-full"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <form onSubmit={updateEvents} className="px-4">
        <div className="flex items-center justify-between pt-4 pb-2">
          <h2 className="font-medium text-3xl">
            {isCreating ? "Creating" : "Editting"} Event
          </h2>
          <button onClick={toggleModal} className="text-2xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-col py-2 space-y-3">
          <div className="flex flex-col">
            <label className="font-medium">EVENT TITLE</label>
            <input
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">START TIME</label>
            <input
              placeholder="Start time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-2 py-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">END TIME</label>
            <input
              placeholder="End time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-2 py-1"
            />
          </div>
        </div>

        {err && <div className="font-medium text-red-500">{err}</div>}

        <div className="pt-2 pb-4 flex items-center justify-between">
          <button type="submit" className="bg-black text-white px-2 py-1">
            <span className="font-medium">
              {isCreating ? "Create" : "Update"} event
            </span>
          </button>

          {!isCreating && (
            <button
              className="bg-red-500 text-white px-2 py-1"
              onClick={deleteEvent}
            >
              Delete event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
