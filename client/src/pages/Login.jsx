import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CHECK_USER_ROUTE } from "../utils/ApiRoutes";
import {useStateProvider} from "../context/StateContext";
import { reducerCases } from "../context/constants";

export default function Login() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateProvider();

  async function handleLogin() {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profilePic },
    } = await signInWithPopup(firebaseAuth, provider);

    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(data);
        if (data.status === "success") {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profilePic,
              status: "",
            },
          });
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center bg-panel-header-background h-screen w-screen flex-col gap-6 text-red-500">
      <div className="flex items-center justify-center gap-2 text-white">
        <img src="/whatsapp.gif" alt="not found" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <button
        className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle className="text-4xl" />
        <span className="text-white text-2xl">Login With Google</span>
      </button>
    </div>
  );
}
