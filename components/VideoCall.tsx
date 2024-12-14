'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createWebSocketConnection } from '@/lib/signaling';
import { createPeerConnection } from '@/lib/rtcConnection';

import RoomControls from './RoomControls'; 
import { SIGNALING_SERVER_URL } from '@/app/constants';

interface VideoCallProps {
  roomId: string;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStreams, setRemoteStreams] = useState<MediaStream[]>([]);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  const signalingConnection = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Step 1: Create WebSocket connection
    const ws = createWebSocketConnection(SIGNALING_SERVER_URL, (data) => {
      if (data.type === 'offer') handleOffer(data.offer);
      if (data.type === 'answer') handleAnswer(data.answer);
      if (data.type === 'ice-candidate') handleIceCandidate(data.candidate);
    });
    signalingConnection.current = ws;

    // Step 2: Create Peer Connection
    const pc = createPeerConnection(
      (stream) => setRemoteStreams((prev) => [...prev, stream]),
      (candidate) => ws.send(JSON.stringify({ type: 'ice-candidate', candidate, room: roomId }))
    );
    setPeerConnection(pc);

    // Step 3: Get local media stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream); // Store the local stream
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream; // Display the local stream
        }
        // Add local stream tracks to the peer connection
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      })
      .catch((err) => console.error('Error accessing media devices:', err));

    return () => {
      ws.close();
      pc.close();
    };
  }, [roomId]);

  // Handle incoming SDP Offer
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    signalingConnection.current?.send(JSON.stringify({ type: 'answer', answer, room: roomId }));
  };

  // Handle incoming SDP Answer
  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnection) return;
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Handle incoming ICE Candidate
  const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnection) return;
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop()); 
    }
    signalingConnection.current?.close(); 
    peerConnection?.close(); // Close the peer connection
    window.location.href = '/'; // Redirect to home page
  };

  return (
    <div>
      <h1>Meeting Room: {roomId}</h1>
      <div>
        <h2>Local Stream</h2>
        <video
          ref={localVideoRef}
          autoPlay
          muted
          style={{ width: '300px', height: '200px', border: '1px solid black' }}
        />
      </div>
      <div>
        <h2>Remote Streams</h2>
        {remoteStreams.map((stream, index) => (
          <video
            key={index}
            autoPlay
            style={{ width: '300px', height: '200px', border: '1px solid black', marginTop: '10px' }}
            ref={(video) => {
              if (video) video.srcObject = stream;
            }}
          />
        ))}
      </div>
     
      <RoomControls localStream={localStream} onLeaveRoom={handleLeaveRoom} />
    </div>
  );
};

export default VideoCall;
