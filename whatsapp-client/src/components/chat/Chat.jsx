import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatItem from "./ChatItem";
import MessageBar from "./MessageBar";
import { pushMessage, setMessages } from "../../state/currentChatUserSlice";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { GET_MESSAGES_ROUTE } from "../../utils/Api_routes";
import { useSocket } from "../../state/socketContext";

export default function Chat() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const chatContainerRef = useRef(null);
  const [isOverflowHidden, setIsOverflowHidden] = useState(true);
  const { socket } = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `${GET_MESSAGES_ROUTE}/${user.uid}/${currentChatUser.uid}`,
      );
      const messages = response.data.data;
      if (response.data.status === "success") {
        dispatch(setMessages(messages));
      }
    };
    if (user.uid && currentChatUser.uid) fetchMessages();
  }, [currentChatUser.uid, user.uid, dispatch]);

  useEffect(() => {
    const handleMessageReceived = (message) => {
      dispatch(pushMessage(message));
    };

    socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setIsOverflowHidden(false); // Enable overflow after scrolling
    }
  }, [currentChatUser.messages]);

  return (
    <div className="h-full w-full border-l-[0.01px] border-gray-300">
      <div>
        <ChatHeader />
      </div>
      <div
        ref={chatContainerRef}
        className={`custom-scrollbar overf flex h-[80%] w-full flex-col bg-conversation-panel-background bg-chat-background bg-fixed p-5 ${
          isOverflowHidden ? "overflow-hidden" : "overflow-y-scroll"
        }`}
      >
        {currentChatUser.messages.map((chat) => (
          <ChatItem key={chat.sentAt} chat={chat} />
        ))}
      </div>
      <div>
        <MessageBar />
      </div>
    </div>
  );
}
