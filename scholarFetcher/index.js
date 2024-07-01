const scholarService = require('./scholarService');

/** Fetch Scholar API
 * @name fetchScholarAPI
 * @param {String} query 
 * @returns {Array<String>}
 */
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