const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors());

app.use((req, res) => {
  const targetUrl = req.url.slice(1); // Remove leading slash
  if (!targetUrl) {
    return res.status(400).send('No URL specified.');
  }
  const requestOptions = {
    url: targetUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
  };
  request(requestOptions)
    .on('error', error => res.status(500).send(error.message))
    .pipe(res);
});

module.exports = app;
