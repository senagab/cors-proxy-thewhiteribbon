const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

app.use(async (req, res) => {
  const targetUrl = req.query.url; // URL should be passed as a query parameter
  if (!targetUrl) {
    return res.status(400).send('No URL specified.');
  }

  try {
    const response = await axios({
      url: targetUrl,
      method: req.method,
      headers: req.headers,
      data: req.body,
      responseType: 'stream'
    });

    response.data.pipe(res);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
