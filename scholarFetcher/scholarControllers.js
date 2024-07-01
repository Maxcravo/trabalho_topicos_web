const api_key = process.env.SERPAPI_KEY;
const { getJson } = require("serpapi");

fetchAPI = async (query) => {
	const requestObj = {
		engine: "google_scholar",
		q: query,
		api_key
	}

	const fetchResults = [];
	await getJson(requestObj, (json) => {
		json["organic_results"].forEach(r => fetchResults.push(r));
	})

	return fetchResults
}

exports.fetchScholarAPI = async (req, res) => {
	console.log('[fetchScholarAPI]');

	try {
		const { query } = req.body;

		if(!query) {
			throw new Error('Query vazia');
		}

		const queryResult = await fetchAPI(query);
		console.log(`queryResult = ${JSON.stringify(queryResult)}`);

		res.status(200).send({
			message: 'Dados obtidos',
			result: queryResult
		})

	} catch (error) {
    console.log('error = ', error);
	}
} 