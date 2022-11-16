const express = require('express');
const cors = require('cors');
const fs = require('fs');

const pathToTraceData = '../frontend/src/data/tracingData.txt';
const pathToTestCases = '../frontend/src/data/testCases.json';
const testCases = require(pathToTestCases);

const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(testCases);
})

app.post('/append', (req, res) => {
  const postedData = req.body;

  if(!testCases.includes(postedData)) {
    testCases.push(postedData);
    fs.writeFileSync(pathToTestCases, JSON.stringify(testCases));
  }

  res.end();
})

app.delete('/tracedata', (req, res) => {
  fs.writeFileSync(pathToTraceData, "");
  res.end();
})

app.delete('/:index', (req, res) => {
  const data = req.body;

  testCases.splice(req.params.index, 1)

  fs.writeFileSync(pathToTestCases, JSON.stringify(testCases));
  res.end();
})

app.get('/tracedata', (req, res) => {
  fs.writeFileSync(pathToTraceData, "");
  res.end();
})

app.listen(port, () => {
  console.log('Backend listening on port', port)
})
