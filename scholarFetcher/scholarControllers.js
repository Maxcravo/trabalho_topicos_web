const path = require("path") 

require("dotenv").config({path: path.resolve(__dirname,"../.env")})

const api_key = process.env.SERPAPI_KEY;

const { getJson } = require("serpapi");

fetchAPI = async (query) => {
	console.log('fetch scholar api');
	const requestObj = {
		engine: "google_scholar",
		q: query,
		num: 20,
		filter: 0, // Parameter defines if the filters for 'Similar Results' and 'Omitted Results' are on or off.It can be set to 1(default ) to enable these filters, or 0 to disable these filters.
		as_vis: 1, // exclude citations,
		as_ylo: 2014,
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

		res.status(200).send({
			message: 'Dados obtidos',
			result: queryResult
		})

	} catch (error) {
    console.log('error = ', error);
		throw error
	}
} 