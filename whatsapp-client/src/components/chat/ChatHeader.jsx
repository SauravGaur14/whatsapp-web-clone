import Avatar from "../common/Avatar";
import { IoVideocam } from "react-icons/io5";
// import { IoVideocam, IoChevronDown } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCall } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { setCalling } from "../../state/userSlice";
import { useSocket } from "../../state/socketContext";

export default function ChatHeader() {
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.onlineUsers);
  const currentChatUser = useSelector((store) => store.currentChatUser);

  function startVideoCall() {
    console.log("starting call");
    dispatch(
      setCalling({
        isCalling: true,
        callType: "video",
        callingTo: currentChatUser.uid,
      }),
    );
    socket.emit("request-video-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }
  async function startVoiceCall() {
    console.log("starting call");
    dispatch(
      setCalling({
        isCalling: true,
        callType: "voice",
        callingTo: currentChatUser.uid,
      }),
    );
    socket.emit("request-voice-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }

  return (
    <>
      <div className="flex w-full items-center justify-between bg-panel-header-background p-3">
        <div className="flex items-center gap-4">
          <Avatar />
          <div className="flex flex-col text-primary-strong">
            <span className="font-medium">
              {currentChatUser.currentChatUserName}
            </span>
            <span>
              {onlineUsers.includes(currentChatUser.uid) ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="mr-4 flex items-center gap-x-3 rounded-2xl border-[1.5px] border-input-background px-4 py-2">
            <IoVideocam
              className="cursor-pointer text-panel-header-icon"
              size={25}
              onClick={startVideoCall}
              title="Video call"
            />
            <IoCall
              className="cursor-pointer text-panel-header-icon"
              size={21}
              onClick={startVoiceCall}
              title="Voice call"
            />
            {/* <IoChevronDown className="text-panel-header-icon" size={25} /> */}
          </div>
          <IoMdSearch className="text-panel-header-icon" size={25} />
          <BsThreeDotsVertical className="text-panel-header-icon" size={25} />
        </div>
      </div>
    </>
  );
}
