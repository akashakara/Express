const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertAd, getAds} = require('./database/ads');

const app = express();

const ads = [
    {title: 'Hello, world (again)!'}
  ];

app.use(helmet());

app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads

app.get('/', async (req, res) => {
  res.send(await getAds());
});
startDatabase().then(async () => {
  await insertAd({title: 'Hello, now from the in-memory database!'});

// starting the server
app.listen(3004, async () => {
  console.log('listening on port 3004');
});
});
