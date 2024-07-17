require("dotenv").config() //TODO Resolver esse erro
console.log(`process.env:`,process.env);
require('./kafkaClientConfig');
const kafkaController = require('./controllers');

const express = require('express');
const app = express();

app.use(express.json());

app.get("/topics", kafkaController.listTopics)
app.post('/topics', kafkaController.createTopics)
app.delete("/topics", kafkaController.deleteTopics)

app.get("/topics/metadata", kafkaController.fetchTopicsMeta)

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
