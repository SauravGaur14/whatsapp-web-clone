/*
import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import Avatar from "../common/Avatar";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { IoCall } from "react-icons/io5";
import { setCalling, setIncomingCall } from "../../state/userSlice";
import { useSocket } from "../../state/socketContext";


export default function Call() {
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();


  function endCallHandler() {
    // end the call
    dispatch(setIncomingCall({ isIncomingCall: false, callType: undefined }));
    dispatch(setCalling({ isCalling: false, callType: undefined }));
    socket.emit("reject-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-conversation-panel-background">
      <div className="flex flex-col items-center justify-center gap-3">
        <Avatar size={20} />
        <span className="text-4xl text-white">
          {user.incomingCall.isIncomingCall
            ? user.incomingCall.callerName
            : currentChatUser.currentChatUserName}
        </span>
      </div>
      <div>
        {user.incomingCall.callType === "video" ? <VideoCall /> : <VoiceCall />}
      </div>
      <div className="absolute bottom-16 flex gap-x-10">
        {user.incomingCall.isIncomingCall && (
          <div className="animate-bounce cursor-pointer overflow-hidden rounded-full bg-icon-green p-5 text-5xl">
             button to accept the call 
            <IoCall title="Accept call" />
          </div>
        )}
        <div className="cursor-pointer overflow-hidden rounded-full bg-red-500 p-5 text-5xl">
           button to end or reject the call 
          <MdCallEnd onClick={endCallHandler} title="End call" />
        </div>
      </div>
    </div>
  );
}
*/

/*
import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import Avatar from "../common/Avatar";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { IoCall } from "react-icons/io5";
import { setCalling, setIncomingCall } from "../../state/userSlice";
import { useSocket } from "../../state/socketContext";

export default function Call() {
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  function endCallHandler() {
    // End the call
    dispatch(setIncomingCall({ isIncomingCall: false, callType: undefined }));
    dispatch(setCalling({ isCalling: false, callType: undefined }));
    socket.emit("reject-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }

  const acceptCallHandler = () => {
    // Accept the incoming call
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
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-conversation-panel-background">
      <div className="flex flex-col items-center justify-center gap-3">
        <Avatar size={20} />
        <span className="text-4xl text-white">
          {user.incomingCall.isIncomingCall
            ? user.incomingCall.callerName
            : currentChatUser.currentChatUserName}
        </span>
      </div>
      <div>
        {user.calling.callType === "video" ? <VideoCall /> : <VoiceCall />}
      </div>
      <div className="absolute bottom-16 flex gap-x-10">
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
*/

import { useDispatch, useSelector } from "react-redux";
import { MdCallEnd } from "react-icons/md";
import Avatar from "../common/Avatar";
import VideoCall from "./VideoCall";
import VoiceCall from "./VoiceCall";
import { IoCall } from "react-icons/io5";
import { setCalling, setIncomingCall } from "../../state/userSlice";
import { useSocket } from "../../state/socketContext";

export default function Call() {
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  function endCallHandler() {
    // End the call
    dispatch(setIncomingCall({ isIncomingCall: false, callType: undefined }));
    dispatch(setCalling({ isCalling: false, callType: undefined }));
    socket.emit("reject-call", {
      from: user.uid,
      to: currentChatUser.uid,
      callerName: user.userName,
    });
  }

  const acceptCallHandler = () => {
    // Accept the incoming call
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
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-conversation-panel-background">
      <div className="flex flex-col items-center justify-center gap-3">
        <Avatar size={20} />
        <span className="text-4xl text-white">
          {user.incomingCall.isIncomingCall
            ? user.incomingCall.callerName
            : currentChatUser.currentChatUserName}
        </span>
      </div>
      <div>
        {user.calling.callType === "video" ? <VideoCall /> : <VoiceCall />}
      </div>
      <div className="absolute bottom-16 flex gap-x-10">
        {user.incomingCall.isIncomingCall && (
          <div
            className="animate-bounce cursor-pointer overflow-hidden rounded-full bg-icon-green p-5 text-5xl"
            onClick={acceptCallHandler}
          >
            {/* Button to accept the call */}
            <IoCall title="Accept call" />
          </div>
        )}
        <div
          className="cursor-pointer overflow-hidden rounded-full bg-red-500 p-5 text-5xl"
          onClick={endCallHandler}
        >
          {/* Button to end or reject the call */}
          <MdCallEnd title="End call" />
        </div>
      </div>
    </div>
  );
}

