import { useDispatch } from "react-redux";
import Avatar from "../common/Avatar";
import { setCurrentChatUser } from "../../state/currentChatUserSlice";
import { setIsChatting } from "../../state/userSlice";

export default function ChatListItem({ user }) {
  const dispatch = useDispatch();

  async function openChatUser() {
    dispatch(
      setCurrentChatUser({
        currentChatUserName: user.name,
        uid: user._id,
      }),
    );

    dispatch(setIsChatting(true));
  }

  return (
    <div
      className="flex cursor-pointer items-center gap-x-5 p-4"
      onClick={openChatUser}
    >
      <Avatar />
      <div className="flex w-[80%] flex-col border-b border-conversation-border py-3">
        <span className="text-xl text-primary-strong">{user.name}</span>
        <span className="truncate text-lg text-bubble-meta">
          {user.lastMessage}
        </span>
      </div>
    </div>
  );
}
