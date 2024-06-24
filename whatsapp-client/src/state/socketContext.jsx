import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const updateSocket = (newSocket) => {
    setSocket(newSocket);
  };

  // UTILITY FUNCTION TO CAPTURE ANY EVENT EMITTED BY SERVER
  // useEffect(() => {
  //   if (socket) {
  //     const logEvent = (event, ...args) => {
  //       console.log(`Event received: ${event}`, ...args);
  //     };

  //     socket.onAny(logEvent);

  //     return () => {
  //       socket.offAny(logEvent);
  //     };
  //   }
  // }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, updateSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
