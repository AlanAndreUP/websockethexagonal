const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const cors = require('cors');
app.use(cors());
wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    
    ws.on('message', (message) => {
  
      const messageAsString = message.toString();
      console.log('Recibido:', messageAsString);
      
    
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(messageAsString);
        }
      });
    });
  });
  
});

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
