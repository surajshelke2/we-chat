"use client"
import React, { useState } from 'react';

interface RoomControlsProps {
  localStream: MediaStream | null; // Local media stream passed as a prop
  onLeaveRoom: () => void; // Callback to handle leaving the room
}

const RoomControls: React.FC<RoomControlsProps> = ({ localStream, onLeaveRoom }) => {
  const [isMuted, setIsMuted] = useState(false); // State for microphone
  const [isVideoOn, setIsVideoOn] = useState(true); // State for video

  // Toggle microphone mute/unmute
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted; // Enable or disable audio track
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOn; // Enable or disable video track
      });
      setIsVideoOn((prev) => !prev);
    }
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
      <button
        onClick={toggleMute}
        style={{
          padding: '10px 20px',
          backgroundColor: isMuted ? 'red' : 'green',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button
        onClick={toggleVideo}
        style={{
          padding: '10px 20px',
          backgroundColor: isVideoOn ? 'green' : 'red',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isVideoOn ? 'Stop Video' : 'Start Video'}
      </button>
      <button
        onClick={onLeaveRoom}
        style={{
          padding: '10px 20px',
          backgroundColor: 'gray',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Leave Room
      </button>
    </div>
  );
};

export default RoomControls;
