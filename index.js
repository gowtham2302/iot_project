const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
let count_s = 88


app.use(cors());

app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next(); // Call the next middleware in the chain
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data', (req, res) => {
  let count = req.query.count;
  count_s = count
  res.status(200).send("success");
});


app.get('/count', (req, res) =>{
  res.send(`count : ${count_s}`)
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
