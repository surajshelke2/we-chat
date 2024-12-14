// create and manage a WebSocket connection.


export const createWebSocketConnection = (
    url: string, 
    onMessage: (data: any) => void
  ) => {
    const ws = new WebSocket(url);
  
    // Triggered when a message is received from the signaling server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data); // Parse the received JSON message
      onMessage(data); // Call the callback to process the message
    };
  
    // WebSocket open event (connection established)
    ws.onopen = () => console.log("WebSocket connected");
  
    // WebSocket error handling
    ws.onerror = (err) => console.error("WebSocket error:", err);
  
    // WebSocket close event (connection terminated)
    ws.onclose = () => console.log("WebSocket closed");
  
    return ws; // Return the WebSocket instance to send data or close the connection later
  };
  