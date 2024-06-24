import { useSelector } from "react-redux";
import formatTime from "../../utils/formatTime";

export default function ChatItem({ chat }) {
  const user = useSelector((store) => store.user);
  return (
    <div
      className={`relative mb-3 ${user.uid === chat.sender ? "self-end " : "self-start"}`}
    >
      <div
        className={`${user.uid === chat.sender ? "messageComponent" : "messageComponent-friend"} flex max-w-[400px] gap-x-3 rounded-md bg-background-default-hover px-3 py-2`}
      >
        <span className="text-primary-strong">{chat.message}</span>
        <span className="self-end pt-2 text-sm text-bubble-meta">
          {formatTime(chat.sentAt)}
        </span>
      </div>
    </div>
  );
}
