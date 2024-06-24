import { useEffect, useRef } from "react";

export default function ContextMenu({ options, position, onClose }) {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={contextMenuRef}
      className="context-menu bg-dropdown-background py-5 rounded-xl"
      style={{
        top: position.y,
        left: position.x,
        position: "absolute",
        zIndex: 1000,
      }}
    >
      <ul>
        {options.map((option, index) => (
          <li className="px-14 py-3 hover:bg-dropdown-background-hover text-primary-strong text-bub hover:cursor-pointer"
            key={index}
            onClick={() => {
              option.callback();
              onClose();
            }}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
