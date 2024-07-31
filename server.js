// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:vorYoCFZskzlDydhnkZEcxzsHXWuFRTA@monorail.proxy.rlwy.net:46556/loaction', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const LocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  url: String
});

const Location = mongoose.model('Location', LocationSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/save-location', async (req, res) => {
  try {
    const { latitude, longitude, url } = req.body;
    const newLocation = new Location({ latitude, longitude, url });
    await newLocation.save();
    res.status(200).send('Location saved successfully');
  } catch (err) {
    res.status(500).send('Error saving location');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
