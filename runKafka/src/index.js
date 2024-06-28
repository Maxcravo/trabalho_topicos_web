require('./kafkaClientConfig');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send({ teste: 'ok'});
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
