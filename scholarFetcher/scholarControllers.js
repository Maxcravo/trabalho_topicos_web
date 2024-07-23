require("dotenv").config()

// const api_key = process.env.SERPAPI_KEY;
const api_key = '417f6d82a3fa9c4ea46149776a73677e7f4af222f92a76e5ba66ce0c896e8bd4';
// console.log('api_key: ', api_key);

const { getJson } = require("serpapi");

fetchAPI = async (query, numberOfResults) => {
	console.log('fetch scholar api');
	const requestObj = {
		engine: "google_scholar",
		q: query,
		num: numberOfResults,
		filter: 0, // Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off.It can be set to 1(default ) to enable these filters, or 0 to disable these filters.
		as_vis: 1, // exclude citations
		scisbd: 2, // order by date
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
		const { query, numberOfResults } = req.body;

		if(!query) {
			throw new Error('Query vazia');
		}

		const queryResult = await fetchAPI(query, numberOfResults);

		res.status(200).send({
			message: 'Dados obtidos',
			result: queryResult
		})

	} catch (error) {
    console.log('error = ', error);
		throw error
	}
} 