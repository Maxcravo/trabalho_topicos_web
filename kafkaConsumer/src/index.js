require('./kafkaClientConfig');
const consumerController = require('./consumerController');

const express = require('express');
const app = express();

app.use(express.json());

app.post('/consume-messages', consumerController.consumeMessages)

app.listen(3003, () => console.log('Listening on http://localhost:3003'));