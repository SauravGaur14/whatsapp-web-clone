import Empty from "../components/common/Empty";
import SideBar from "../components/chatList/SideBar";
import Chat from "../components/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setIsChatting, setIncomingCall, setCalling } from "../state/userSlice";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setOnlineUsers } from "../state/onlineUserSlice";
import { useSocket } from "../state/socketContext";
import Call from "../components/calling/Call";

export default function Home() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useSocket();

  useEffect(() => {
    if (!user.uid) navigate("/login");
  }, [user.uid, navigate]);

  const handleUpdateOnlineUsers = useCallback(
    (onlineUsers) => {
      // console.log("online user list updated", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    },
    [dispatch],
  );

  useEffect(() => {
    if (socket) {
      socket.on("updateOnlineUsers", handleUpdateOnlineUsers);
      socket.on("incoming-video-call", (callDetails) => {
        dispatch(
          setIncomingCall({
            isIncomingCall: true,
            callType: "video",
            callerName: callDetails.callerName,
          }),
        );
      });
      socket.on("incoming-voice-call", (callDetails) => {
        dispatch(
          setIncomingCall({
            isIncomingCall: true,
            callType: "voice",
            callerName: callDetails.callerName,
          }),
        );
      });

      socket.on("rejected-call", () => {
        dispatch(
          setCalling({
            isCalling: false,
            callType: undefined,
          }),
        );
        dispatch(
          setIncomingCall({
            isCalling: false,
            callType: undefined,
          }),
        );
      });

      return () => {
        socket.off("updateOnlineUsers", handleUpdateOnlineUsers);
      };
    }
  }, [socket, handleUpdateOnlineUsers, dispatch]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        dispatch(setIsChatting(false));
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  if (user.calling.isCalling || user.incomingCall.isIncomingCall)
    return <Call />;

  return (
    <div className="custom-scrollbar flex h-screen w-full overflow-hidden overflow-x-scroll">
      <div className="w-1/3 min-w-[300px] bg-conversation-panel-background">
        <SideBar />
      </div>
      <div className="w-2/3 min-w-[500px]">
        {user.isChatting ? <Chat /> : <Empty />}
      </div>
    </div>
  );
}
