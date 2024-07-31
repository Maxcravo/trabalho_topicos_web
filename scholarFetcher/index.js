const scholarControllers = require('./scholarControllers');

const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

app.use(express.json());
app.post('/search', scholarControllers.fetchScholarAPI);

app.listen(3001, () => console.log('Listening on http://localhost:3001'));