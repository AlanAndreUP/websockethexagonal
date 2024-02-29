const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  ws.on('message', (message) => {
    console.log('Recibido:', message);
  });
});



const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
