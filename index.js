const express = require('express');
const cors = require('cors');
const path = require('path');
const ws = require('ws');
const events = require('events');


const app = express();
const eventEmitter = new events.EventEmitter()

const port = 3000;
let count_s = 88


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next(); // Call the next middleware in the chain
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
  let count = req.query.count;
  count_s = count
  eventEmitter.emit('count');
  return res.status(200).send('OK');
});


app.get('/count', (req, res) =>{
  res.send(`count : ${count_s}`)
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// Create a WebSocket client
const wss = new ws.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(count_s);

  eventEmitter.on('count', () => {
    ws.send(count_s);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
