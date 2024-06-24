import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoAdd } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage } from "../../state/currentChatUserSlice";
import { SEND_MESSAGE_ROUTE } from "../../utils/Api_routes";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "../../state/socketContext";

export default function MessageBar() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const user = useSelector((state) => state.user);
  const currentChatUser = useSelector((state) => state.currentChatUser);
  const dispatch = useDispatch();
  const {socket} =useSocket();

  useEffect(() => {
    inputRef.current.focus();
    // Event listener to close emoji picker when clicking outside
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function messageChangeHandler(e) {
    setMessage(e.target.value);
  }

  function handleClickOutside(event) {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target) &&
      event.target.id !== "emoji-opener"
    ) {
      setShowEmojiPicker(false);
    }
  }

  function onEmojiClick(emojiObject) {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  }

  async function sendMsgHandler(e) {
    e.preventDefault();
    if (message.length <= 0) return;
    const msg = {
      message,
      sender: user.uid,
      receiver: currentChatUser.uid,
      sentAt: Date.now(),
    };

    // save message to the database
    const { data } = await axios.post(SEND_MESSAGE_ROUTE, msg);
    socket.emit("send message", data.newMsg);
    dispatch(pushMessage(msg));
    setMessage("");
  }

  return (
    <form
      onSubmit={sendMsgHandler}
      className="flex w-full items-center gap-x-5 bg-conversation-panel-background px-4 py-3"
    >
      <div className="relative flex items-center justify-center gap-x-4">
        <BsEmojiLaughing
          size={25}
          id="emoji-opener"
          className="cursor-pointer text-panel-header-icon"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />
        {showEmojiPicker && (
          <div ref={emojiPickerRef} className="absolute bottom-12 left-0 z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
        <ImAttachment
          className="cursor-pointer text-xl text-panel-header-icon"
          title="Attach"
          onClick={() => {}}
        />
        <IoAdd size={30} className="text-panel-header-icon" />
      </div>
      <input
        className="w-[90%] text-primary-strong rounded-lg bg-input-background p-2 focus:outline-none"
        type="text"
        name="messageBar"
        id="messageBar"
        placeholder="Type a message"
        onChange={messageChangeHandler}
        value={message}
        ref={inputRef}
      />
      <div>
        {message.length ? (
          <button>
            <IoSend
              size={25}
              className="text-panel-header-icon"
              onClick={sendMsgHandler}
              type="submit"
            />
          </button>
        ) : (
          <button>
            <IoMdMic size={25} className="text-panel-header-icon" />
          </button>
        )}
      </div>
    </form>
  );
}
