import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../state/socketContext";

export default function VoiceCall() {
  const user = useSelector((store) => store.user);
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const { socket } = useSocket();

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const sdpPromises = useRef(Promise.resolve());
  const pendingCandidates = useRef([]);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        localStreamRef.current.srcObject = stream;

        peerConnectionRef.current = new RTCPeerConnection();

        // Add local stream tracks to peer connection
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
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
          remoteStreamRef.current.srcObject = event.streams[0];
        };

        socket.on("ice-candidate", (candidate) => {
          if (candidate) {
            if (peerConnectionRef.current.remoteDescription) {
              addIceCandidate(candidate);
            } else {
              pendingCandidates.current.push(candidate);
            }
          }
        });

        socket.on("sdp-offer", async (offer) => {
          sdpPromises.current = sdpPromises.current.then(async () => {
            if (peerConnectionRef.current.signalingState !== "stable") {
              return;
            }

            try {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(offer),
              );
              const answer = await peerConnectionRef.current.createAnswer();
              await peerConnectionRef.current.setLocalDescription(answer);
              socket.emit("sdp-answer", {
                to: currentChatUser.uid,
                answer,
              });

              // Add any pending candidates after setting remote description
              while (pendingCandidates.current.length) {
                await addIceCandidate(pendingCandidates.current.shift());
              }
            } catch (error) {
              console.error("Error handling SDP offer", error);
            }
          });
        });

        socket.on("sdp-answer", async (answer) => {
          sdpPromises.current = sdpPromises.current.then(async () => {
            if (peerConnectionRef.current.signalingState !== "have-local-offer")
              return;

            try {
              await peerConnectionRef.current.setRemoteDescription(
                new RTCSessionDescription(answer),
              );
            } catch (error) {
              console.error("Error handling SDP answer", error);
            }
          });
        });

        if (user.calling.isCalling && user.calling.callType === "voice") {
          initiateCall();
        }
      } catch (error) {
        console.error("Error setting up media:", error);
      }
    };

    const initiateCall = async () => {
      if (peerConnectionRef.current.signalingState !== "stable") {
        console.warn("Cannot initiate call, signaling state not stable.");
        return;
      }

      try {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit("sdp-offer", {
          to: currentChatUser.uid,
          offer,
        });
      } catch (error) {
        console.error("Error initiating call", error);
      }
    };

    const addIceCandidate = async (candidate) => {
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate),
        );
      } catch (error) {
        console.error("Error adding received ice candidate", error);
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
    };
  }, [socket, currentChatUser, user.calling]);

  return (
    <div>
      <div className="h-[300px] w-[300px] border-red-500">
        <audio ref={localStreamRef} autoPlay muted />
      </div>

      <div className="h-[300px] w-[300px] border-blue-500">
        <audio ref={remoteStreamRef} autoPlay />{" "}
      </div>
    </div>
  );
}
