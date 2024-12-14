
//WebRTC peer-to-peer connection logic



export const createPeerConnection = (
    onTrack: (stream: MediaStream) => void, // Callback to handle remote media streams
    onIceCandidate: (candidate: RTCIceCandidate) => void // Callback to send ICE candidates to the signaling server
  ) => {
    // WebRTC configuration with STUN servers for NAT traversal
    const config: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    };
  
    // Create a new RTCPeerConnection instance
    const peerConnection = new RTCPeerConnection(config);
  
    // Handle ICE candidates generated by this peer connection
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        onIceCandidate(event.candidate); // Send the candidate to the signaling server
      }
    };
  
    // Handle remote streams (when another peer adds tracks to the connection)
    peerConnection.ontrack = (event) => {
      console.log('Remote stream received:', event.streams[0]);
      onTrack(event.streams[0]); // Pass the remote stream to the callback
    };
  
    // Handle connection state changes (e.g., connected, disconnected)
    peerConnection.onconnectionstatechange = () => {
      console.log('Connection state changed:', peerConnection.connectionState);
      if (peerConnection.connectionState === 'disconnected') {
        console.log('Peer disconnected');
      }
    };
  
    return peerConnection; // Return the initialized peer connection instance
  };
  