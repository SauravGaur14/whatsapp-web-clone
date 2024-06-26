import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { IoCall } from "react-icons/io5";
import {
  setCalling,
  setIncomingCall,
  setOngoingCall,
} from "../../state/userSlice";
import { useSocket } from "../../state/socketContext";

export default function Call() {
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  function endCallHandler() {
    dispatch(setIncomingCall({ isIncomingCall: false, callType: undefined }));
    dispatch(
      setCalling({
        isCalling: false,
        callType: undefined,
        callingTo: undefined,
      }),
    );
    console.log("emiting reject call event");
    socket.emit("reject-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }

  const acceptCallHandler = () => {
    if (user.incomingCall.callType === "video") {
      dispatch(
        setCalling({
          isCalling: true,
          callType: "video",
          callingTo: user.incomingCall.callerUid,
        }),
      );
    } else {
      dispatch(
        setCalling({
          isCalling: true,
          callType: "voice",
          callingTo: user.incomingCall.callerUid,
        }),
      );
    }

    dispatch(setOngoingCall(true));
    dispatch(
      setIncomingCall({
        isIncomingCall: false,
        callType: undefined,
        callerName: undefined,
        callerUid: undefined,
      }),
    );
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-conversation-panel-background p-4">
      <div className="flex flex-col items-center justify-center gap-3">
        <span className="text-4xl text-white">
          {!user.ongoingCall &&
            user.calling.isCalling &&
            `Calling ${currentChatUser.currentChatUserName}`}
          {user.incomingCall.isIncomingCall &&
            `Call from ${user.incomingCall.callerName} `}
        </span>
      </div>
      <div>
        {user.calling.callType === "video" ? <VideoCall /> : <VoiceCall />}
      </div>
      <div className="absolute bottom-5 flex gap-x-10">
        {user.incomingCall.isIncomingCall && (
          <div
            className="animate-bounce cursor-pointer overflow-hidden rounded-full bg-icon-green p-5 text-5xl"
            onClick={acceptCallHandler}
          >
            <IoCall title="Accept call" />
          </div>
        )}
        <div
          className="cursor-pointer overflow-hidden rounded-full bg-red-500 p-5 text-5xl"
          onClick={endCallHandler}
        >
          <MdCallEnd title="End call" />
        </div>
      </div>
    </div>
  );
}
