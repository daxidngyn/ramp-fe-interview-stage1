export default function Event({
  toggleModal,
  event,
}: {
  toggleModal: (event: any) => void;
  event: any;
}) {
  return (
    <article
      onClick={() => toggleModal(event)}
      className="bg-red-100 absolute left-8 w-full p-2 rounded-lg"
      style={{
        top: `${event.startTime * 2.5}rem`,
        width: `calc(100% - 2rem)`,
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
  );
}
