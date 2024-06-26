import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useSocket } from "../state/socketContext";

export default function useLogout() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const { socket } = useSocket();

  const logout = () => {
    signOut(auth)
      .then(() => {
        socket.emit("logout", user.uid);
       
        dispatch(
          setUser({
            uid: undefined,
            userName: undefined,
            profileUrl: undefined,
            socket: undefined,
            isChatting: false,
          }),
        );
        navigate("/login");
      })
      .catch((error) => {
        alert("Error logging out! Please try again");
      });
  };

  return logout;
}
