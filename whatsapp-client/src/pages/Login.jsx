import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { useSocket } from "../state/socketContext";

// FIREBASE
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  getAuth,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebaseConfig";

import { io } from "socket.io-client";
import axios from "axios";

// ICONS
import { FcGoogle } from "react-icons/fc";
import { PiGearFineDuotone } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect } from "react";
import { HOST, LOGIN_USER_ROUTE } from "../utils/Api_routes";

export default function Login() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateSocket } = useSocket();

  useEffect(() => {
    if (user.uid) {
      const newSocket = io(HOST);
      newSocket.on("connect", () => {
        newSocket.emit("login", { uid: user.uid });
        updateSocket(newSocket);
      });

      // return () => newSocket.close();
    }
  }, [user.uid, updateSocket]);

  useEffect(() => {
    const handleRedirectResult = async () => {
      const auth = getAuth();
      try {
        const result = await getRedirectResult(auth);

        if (result) {
          const data = result.user;
          const userInfo = {
            userName: data.displayName,
            profileUrl: data.photoURL,
            uid: data.providerData[0].uid,
            email: data.email,
          };

          if (userInfo.email) {
            const {
              data: { user: userData },
            } = await axios.post(`${LOGIN_USER_ROUTE}`, {
              userInfo,
            });
            userInfo.uid = userData._id;
          }

          dispatch(setUser(userInfo));
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to get redirect result:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error details: ${errorCode}, ${errorMessage}`);
      }
    };

    handleRedirectResult();
  }, [dispatch, navigate]);

  const loginHandler = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="custom-scrollbar relative min-h-screen w-full bg-[#e9ecef]">
      <div className="flex h-56 bg-icon-green">
        <div className="absolute left-[10%] top-10 flex items-center gap-3">
          <img src="/whatsapp.svg" alt="whatsapp" />
          <span className="text-center text-sm font-medium text-[#fff]">
            WHATSAPP WEB
          </span>
        </div>
      </div>
      <div className="z-0 h-screen min-h-96 w-full bg-[#e9ecef] md:w-4/5">
        <div className="absolute top-28 z-50 mb-4 w-full bg-white p-5 shadow-2xl md:left-[10%] md:w-4/5 md:rounded-md md:p-10">
          <div className="mb-6 flex items-center rounded-md border border-[#d1d7db] p-3 md:gap-4 md:px-7 md:py-5">
            <img src="/wa-desktop.svg" alt="wa-whatsapp" />
            <div className="flex flex-col items-center justify-center gap-1 p-2 md:flex-row md:gap-3">
              <div className="flex flex-col justify-center">
                <span className="text-lg">Download WhatspApp for Windows</span>
                <span className="hidden max-w-[460px] text-wrap text-sm text-[#54655F] md:inline">
                  Get calling, screen sharing and a faster experience with the
                  new Windows app.
                </span>
              </div>
              <button className="bg-button-primary w-max rounded-3xl px-10 py-3 text-sm font-medium text-white">
                Get from Microsoft Store
              </button>
            </div>
          </div>
          <div className="mb-10 mt-5 flex flex-col justify-between border-b border-[#d1d7db] md:flex-row">
            <div>
              <span className="text-3xl font-light text-[#41525D]">
                Use WhatsApp on your computer
              </span>
              <div className="mt-5">
                <ol
                  type="1"
                  className="flex flex-col gap-y-3 text-lg text-[#3B4A54]"
                >
                  <li>
                    <span>1. Open WhatsApp on your phone</span>
                  </li>
                  <li>
                    <span>
                      2. Tap
                      <span className="text-center font-medium">
                        {"  "}
                        Menu{" "}
                        <BsThreeDotsVertical className="inline bg-slate-300 text-xl text-slate-900" />{" "}
                        on Android or Settings{" "}
                        <PiGearFineDuotone className="inline bg-slate-300 text-2xl text-slate-900" />{" "}
                        on iPhone
                      </span>
                    </span>
                  </li>
                  <li>
                    <span>
                      3. Tap
                      <span className="font-medium"> Linked devices</span> and
                      then
                      <span className="font-medium"> Link a device</span>
                    </span>
                  </li>
                  <li>
                    <span>
                      4. Point your phone at this screen to capture the QR code
                    </span>
                  </li>
                </ol>
              </div>
            </div>
            <div
              className="relative mb-4 mt-4 flex h-64 w-64 cursor-pointer flex-col items-center justify-center self-center overflow-hidden bg-qr-code md:mt-0"
              onClick={loginHandler}
            >
              <div className="rounded-full bg-[#1a1a1a] p-5 shadow-black">
                <FcGoogle className="text-7xl" />
              </div>

              <span className="absolute bottom-1 text-xl font-bold text-[#008069]">
                Login With Google
              </span>
            </div>
          </div>
          <span className="cursor-pointer text-lg text-[#008069]">
            Link with Phone Number
          </span>
        </div>
      </div>
    </div>
  );
}
