const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });


const rooms = {};

wss.on('connection', (ws) => {
  console.log('New client connected');


  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'join':
        // Add the client to the specified room
        if (!rooms[data.room]) {
          rooms[data.room] = [];
        }
        rooms[data.room].push(ws);
        ws.room = data.room;
        console.log(`Client joined room: ${data.room}`);
        break;

      case 'offer':
      case 'answer':
      case 'ice-candidate':
        // Broadcast signaling messages to other clients in the room
        const clientsInRoom = rooms[data.room] || [];
        clientsInRoom.forEach((client) => {
          if (client !== ws) {
            client.send(JSON.stringify(data));
          }
        });
        break;

      default:
        console.error('Unknown message type:', data.type);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    if (ws.room) {
      rooms[ws.room] = rooms[ws.room]?.filter((client) => client !== ws);
      if (rooms[ws.room]?.length === 0) {
        delete rooms[ws.room];
      }
      console.log(`Client disconnected from room: ${ws.room}`);
    }
  });
});

console.log('Signaling server running on ws://localhost:3001');
