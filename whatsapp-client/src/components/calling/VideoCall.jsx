import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../state/socketContext";

export default function VideoCall() {
  const user = useSelector((store) => store.user);
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const { socket } = useSocket();

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    let localStream;

    const setupMedia = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current.srcObject = localStream;

        peerConnectionRef.current = new RTCPeerConnection(configuration);

        localStream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, localStream);
        });

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              to: currentChatUser.uid,
              candidate: event.candidate,
            });
          }
        };

        peerConnectionRef.current.ontrack = (event) => {
          const [remoteStream] = event.streams;
          remoteStreamRef.current.srcObject = remoteStream;
        };

        socket.on("ice-candidate", async (message) => {
          if (message.candidate) {
            try {
              const candidate = new RTCIceCandidate(message.candidate);
              await peerConnectionRef.current.addIceCandidate(candidate);
            } catch (e) {
              console.error("Error adding received ice candidate", e);
            }
          }
        });

        socket.on("sdp-offer", async (message) => {
          if (message.offer) {
            try {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(message.offer),
              );
              const answer = await peerConnectionRef.current.createAnswer();
              await peerConnectionRef.current.setLocalDescription(answer);
              socket.emit("sdp-answer", { to: currentChatUser.uid, answer });
            } catch (error) {
              console.error("Error handling SDP offer", error);
            }
          }
        });

        socket.on("sdp-answer", async (message) => {
          if (message.answer) {
            try {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(message.answer),
              );
            } catch (error) {
              console.error("Error handling SDP answer", error);
            }
          }
        });

        if (user.calling.isCalling && user.calling.callType === "video") {
          initiateCall();
        }
      } catch (error) {
        console.error("Error setting up media:", error);
      }
    };

    const initiateCall = async () => {
      try {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit("sdp-offer", { to: currentChatUser.uid, offer });
      } catch (error) {
        console.error("Error initiating call", error);
      }
    };

    setupMedia();

    return () => {
      socket.off("ice-candidate");
      socket.off("sdp-offer");
      socket.off("sdp-answer");

      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }

      if (localStreamRef.current && localStreamRef.current.srcObject) {
        localStreamRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }

      if (remoteStreamRef.current && remoteStreamRef.current.srcObject) {
        remoteStreamRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [socket, currentChatUser, user.calling]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <div className="relative">
        <video
          className="h-[280px] w-[100%] border border-red-500"
          ref={localStreamRef}
          autoPlay
          playsInline
          muted
        />
        <span className="absolute bottom-2 left-5 rounded bg-black bg-opacity-50 px-2 py-1 text-lg text-white">
          You
        </span>
      </div>
      <div className="relative">
        <video
          className="h-[280px] w-[100%] border border-blue-500"
          ref={remoteStreamRef}
          autoPlay
          playsInline
        />
        <div className="absolute bottom-2 left-5 rounded bg-black bg-opacity-50 px-2 py-1 text-lg text-white">
          {currentChatUser.currentChatUserName}
        </div>
      </div>
    </div>
  );
}
