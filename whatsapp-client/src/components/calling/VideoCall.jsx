// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useSocket } from "../../state/socketContext";

// export default function VideoCall() {
//   const user = useSelector((store) => store.user);
//   const currentChatUser = useSelector((store) => store.currentChatUser);
//   const { socket } = useSocket();

//   const localStreamRef = useRef(null);
//   const remoteStreamRef = useRef(null);
//   const peerConnectionRef = useRef(null);

//   async function openMediaDevices(constraints) {
//     return await navigator.mediaDevices.getUserMedia(constraints);
//   }

//   function setUpMediaDevice() {
//     try {
//       const stream = openMediaDevices({ video: true, audio: true });
//       console.log("Got MediaStream:", stream);
//     } catch (error) {
//       console.error("Error accessing media devices.", error);
//     }
//   }

//   async function playVideoFromCamera() {
//     try {
//         const constraints = {'video': true, 'audio': true};
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         // const videoElement = document.querySelector('video#localVideo');
//         localStreamRef.current.srcObject = stream;
//     } catch(error) {
//         console.error('Error opening video camera.', error);
//     }
// }

// async function makeCall() {
//     // const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
//     const peerConnection = new RTCPeerConnection();
//     signalingChannel.addEventListener('message', async message => {
//         if (message.answer) {
//             const remoteDesc = new RTCSessionDescription(message.answer);
//             await peerConnection.setRemoteDescription(remoteDesc);
//         }
//     });
//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);
//     signalingChannel.send({'offer': offer});
// }
// // Listening for calls on receiver side
// const peerConnection = new RTCPeerConnection();
// signalingChannel.addEventListener('message', async message => {
//     if (message.offer) {
//         peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         signalingChannel.send({'answer': answer});
//     }
// });
/*
  useEffect(() => {
    const setupMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current.srcObject = stream;
    };
    setupMedia();

    peerConnectionRef.current = new RTCPeerConnection();

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
      peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("sdp-offer", async (offer) => {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socket.emit("sdp-answer", {
        to: currentChatUser.uid,
        answer,
      });
    });

    socket.on("sdp-answer", async (answer) => {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    return () => {
      socket.off("ice-candidate");
      socket.off("sdp-offer");
      socket.off("sdp-answer");
      peerConnectionRef.current.close();
    };
  }, [socket, currentChatUser]);

  const initiateCall = async () => {
    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit("sdp-offer", {
      to: currentChatUser.uid,
      offer,
    });
  };

  useEffect(() => {
    if (user.calling.isCalling && user.calling.callType === "video") {
      initiateCall();
    }
  }, [user.calling]);

*/

//   return (
//     <div>
//       <video ref={localStreamRef} autoPlay muted />
//       <video ref={remoteStreamRef} autoPlay />
//     </div>
//   );
// }

/*
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
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current.srcObject = stream;

        peerConnectionRef.current = new RTCPeerConnection();

        stream.getTracks().forEach(track => {
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
          const [remoteStream] = event.streams;
          remoteStreamRef.current.srcObject = remoteStream;
        };

        socket.on("ice-candidate", async (message) => {
          if (message.candidate) {
            try {
              await peerConnectionRef.current.addIceCandidate(message.candidate);
            } catch (e) {
              console.error('Error adding received ice candidate', e);
            }
          }
        });

        socket.on("sdp-offer", async (message) => {
          if (message.offer) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socket.emit("sdp-answer", {
              to: currentChatUser.uid,
              answer,
            });
          }
        });

        socket.on("sdp-answer", async (message) => {
          if (message.answer) {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
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
        socket.emit("sdp-offer", {
          to: currentChatUser.uid,
          offer,
        });
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
    };
  }, [socket, currentChatUser, user.calling]);

  return (
    <div className="flex gap-4">
      <video className="border-red-500 border" ref={localStreamRef} autoPlay muted />
      <video className="border-blue-500 border" ref={remoteStreamRef} autoPlay />
    </div>
  );
}
*/
// import React, { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
// import { useSocket } from "../../state/socketContext";

// export default function VideoCall() {
//   const user = useSelector((store) => store.user);
//   const currentChatUser = useSelector((store) => store.currentChatUser);
//   const { socket } = useSocket();

//   const localStreamRef = useRef(null);
//   const remoteStreamRef = useRef(null);
//   const peerConnectionRef = useRef(null);

//   const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

//   useEffect(() => {
//     const setupMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//         localStreamRef.current.srcObject = stream;

//         peerConnectionRef.current = new RTCPeerConnection(configuration);

//         stream.getTracks().forEach(track => {
//           peerConnectionRef.current.addTrack(track, stream);
//         });

//         peerConnectionRef.current.onicecandidate = (event) => {
//             if (event.candidate) {
//               socket.emit("ice-candidate", {
//                 to: currentChatUser.uid,
//                 candidate: event.candidate.toJSON(), // Ensure proper serialization
//               });
//             }
//           };

//         peerConnectionRef.current.ontrack = (event) => {
//           const [remoteStream] = event.streams;
//           remoteStreamRef.current.srcObject = remoteStream;
//         };

//         socket.on("ice-candidate", async (message) => {
//             if (message.candidate) {
//               try {
//                 console.log(typeof message.candidate, "candidate =", message.candidate);
//                 // Correctly structure the candidate object
//                 const candidate = new RTCIceCandidate({
//                   candidate: message.candidate.candidate,
//                   sdpMid: message.candidate.sdpMid,
//                   sdpMLineIndex: message.candidate.sdpMLineIndex,
//                   usernameFragment: message.candidate.usernameFragment
//                 });
//                 await peerConnectionRef.current.addIceCandidate(candidate);
//               } catch (e) {
//                 console.error('Error adding received ice candidate', e);
//               }
//             }
//           });

//         socket.on("sdp-offer", async (message) => {
//           if (message.offer) {
//             try {
//               await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.offer));
//               const answer = await peerConnectionRef.current.createAnswer();
//               await peerConnectionRef.current.setLocalDescription(answer);
//               socket.emit("sdp-answer", {
//                 to: currentChatUser.uid,
//                 answer,
//               });
//             } catch (error) {
//               console.error("Error handling SDP offer", error);
//             }
//           }
//         });

//         socket.on("sdp-answer", async (message) => {
//           if (message.answer) {
//             try {
//               await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
//             } catch (error) {
//               console.error("Error handling SDP answer", error);
//             }
//           }
//         });

//         if (user.calling.isCalling && user.calling.callType === "video") {
//           initiateCall();
//         }
//       } catch (error) {
//         console.error("Error setting up media:", error);
//       }
//     };

//     const initiateCall = async () => {
//       try {
//         const offer = await peerConnectionRef.current.createOffer();
//         await peerConnectionRef.current.setLocalDescription(offer);
//         socket.emit("sdp-offer", {
//           to: currentChatUser.uid,
//           offer,
//         });
//       } catch (error) {
//         console.error("Error initiating call", error);
//       }
//     };

//     setupMedia();

//     return () => {
//       socket.off("ice-candidate");
//       socket.off("sdp-offer");
//       socket.off("sdp-answer");
//       if (peerConnectionRef.current) {
//         peerConnectionRef.current.close();
//       }
//     };
//   }, [socket, currentChatUser, user.calling]);

//   return (
//     <div className="flex gap-4">
//       <video className="border-red-500 border" ref={localStreamRef} autoPlay muted />
//       <video className="border-blue-500 border" ref={remoteStreamRef} autoPlay />
//     </div>
//   );
// }
/*
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../state/socketContext";

export default function VideoCall() {
  const user = useSelector((store) => store.user);
  const currentChatUser = useSelector((store) => store.currentChatUser);
  const { socket } = useSocket();

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current.srcObject = stream;

        peerConnectionRef.current = new RTCPeerConnection(configuration);

        stream.getTracks().forEach((track) => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              to: currentChatUser.uid,
              candidate: event.candidate.toJSON(), // Ensure proper serialization
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
              console.log(
                typeof message.candidate,
                "candidate =",
                message.candidate,
              );
              // Correctly structure the candidate object
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
              socket.emit("sdp-answer", {
                to: currentChatUser.uid,
                answer,
              });
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
        socket.emit("sdp-offer", {
          to: currentChatUser.uid,
          offer,
        });
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
    };
  }, [socket, currentChatUser, user.calling]);

  return (
    <div className="flex gap-4">
      <video
        className="border border-red-500"
        ref={localStreamRef}
        autoPlay
        muted
      />
      <video
        className="border border-blue-500"
        ref={remoteStreamRef}
        autoPlay
      />
    </div>
  );
}
*/
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
      const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current.srcObject = stream;

        peerConnectionRef.current = new RTCPeerConnection(configuration);

        stream.getTracks().forEach(track => {
          peerConnectionRef.current.addTrack(track, stream);
        });

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("ice-candidate", {
              to: currentChatUser.uid,
              candidate: event.candidate.toJSON(), // Ensure proper serialization
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
              console.log(typeof message.candidate, "candidate =", message.candidate);
              // Correctly structure the candidate object
              const candidate = new RTCIceCandidate(message.candidate);
              await peerConnectionRef.current.addIceCandidate(candidate);
            } catch (e) {
              console.error('Error adding received ice candidate', e);
            }
          }
        });

        socket.on("sdp-offer", async (message) => {
          if (message.offer) {
            try {
              await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.offer));
              const answer = await peerConnectionRef.current.createAnswer();
              await peerConnectionRef.current.setLocalDescription(answer);
              socket.emit("sdp-answer", {
                to: currentChatUser.uid,
                answer,
              });
            } catch (error) {
              console.error("Error handling SDP offer", error);
            }
          }
        });

        socket.on("sdp-answer", async (message) => {
          if (message.answer) {
            try {
              await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.answer));
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
        socket.emit("sdp-offer", {
          to: currentChatUser.uid,
          offer,
        });
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
    };
  }, [socket, currentChatUser, user.calling]);

  return (
    <div className="flex gap-4">
      <video className="border-red-500 border" ref={localStreamRef} autoPlay muted />
      <video className="border-blue-500 border" ref={remoteStreamRef} autoPlay />
    </div>
  );
}
