require('./kafkaClientConfig');
const producerController = require('./producerController');

const express = require('express');
const app = express();

app.use(express.json());

app.post('/produce-messages', producerController.produceMessages)

app.listen(3002, () => console.log('Listening on http://localhost:3002'));