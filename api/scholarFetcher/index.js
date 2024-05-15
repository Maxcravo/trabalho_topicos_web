const scholarService = require('./scholarService');

async function fetchScholarAPI(query) {
	try {
		const queryResult = await scholarService.fetchAPI(query);
		console.log(`queryResult = ${JSON.stringify(queryResult)}`);

		return queryResult;

	} catch (error) {
		console.log(`error = ${JSON.stringify(error)}`);
	}
} 

module.exports = {
	fetchScholarAPI
}