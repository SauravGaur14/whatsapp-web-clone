import Avatar from "../common/Avatar";
import { MdAddComment } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import ContextMenu from "../common/ContextMenu";
import useLogout from "../../utils/logout";

export default function ChatListHeader() {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuOptions, setContextMenuOptions] = useState([]);
  const logout = useLogout();

  const handleButtonClick = (event) => {
    const options = [
      {
        name: "New Chat",
        callback: () => alert("Option 1 selected"),
      },
      {
        name: "Settings",
        callback: () => alert("Option 1 selected"),
      },
      {
        name: "Logout",
        callback: () => {
          logout();
        },
      },
    ];

    setContextMenuPosition({ x: event.clientX, y: event.clientY });
    setContextMenuOptions(options);
    setContextMenuVisible(true);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  return (
    <div className="flex items-center justify-between bg-panel-header-background p-5">
      <div>
        <Avatar />
      </div>

      <div className="flex gap-x-5 p-1">
        <MdOutlineGroups className="text-panel-header-icon hover:cursor-pointer" size={25} title="Communities" />
        <BsChatDots className="text-panel-header-icon hover:cursor-pointer" size={25} title="Channels" />
        <MdAddComment className="text-panel-header-icon hover:cursor-pointer" size={25} title="New Chat" />
        <BsThreeDotsVertical
          className="text-panel-header-icon hover:cursor-pointer"
          size={25}
          onClick={handleButtonClick}
          title="Menu"
        />
      </div>
      {contextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          position={contextMenuPosition}
          onClose={handleCloseContextMenu}
        />
      )}
    </div>
  );
}
