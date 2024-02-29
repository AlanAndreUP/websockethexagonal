const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Cuando se recibe un mensaje de cualquier cliente
  ws.on('message', (message) => {
    console.log('Recibido:', message);
    
    // Reenviar el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
