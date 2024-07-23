const scholarControllers = require('./scholarControllers');

const express = require('express');
const app = express();

app.use(express.json());
app.post('/search', scholarControllers.fetchScholarAPI);

app.listen(3001, () => console.log('Listening on http://localhost:3001'));