const { getJson } = require("serpapi");

const api_key = process.env.SERPAPI_KEY;

exports.fetchAPI = async (query) => {
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