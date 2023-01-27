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

  const updateEvents = (e: any) => {
    e.preventDefault();

    if (isCreating) {
      const newEvent = {
        title: title,
        id: events.length,
        startTime: startTime,
        endTime: endTime,
      };

      setEvents((prevEvents: any) => [...prevEvents, newEvent]);
      toggleModal();
      return;
    }

    // editting
    const idx = events.findIndex((e: any) => e.id == event.id);

    console.log(events[idx]);
  };

  return (
    <div
      className="shadow-lg drop-shadow-md rounded-lg absolute top-2/4 left-2/4 bg-zinc-100 max-w-2xl w-full"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <form onSubmit={updateEvents}>
        <div className="flex items-center justify-between pt-4 pb-2 px-4">
          <h2 className="font-medium text-3xl">
            {isCreating ? "Creating" : "Editting"} Event
          </h2>
          <button onClick={toggleModal} className="text-2xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-col py-2 px-4 space-y-3">
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

        <div className="px-4 pt-2 pb-4">
          <button type="submit" className="bg-black text-white px-2 py-1">
            <span className="font-medium">
              {isCreating ? "Create" : "Update"} event
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
