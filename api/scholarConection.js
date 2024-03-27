// Fazer a conexão com a API do serpapi para realizar as buscas no google scholar
require('dotenv').config(); // tem que colocar no arquivo de entrada (entry point) da aplicação

const { getJson } = require ("serpapi");
const filteredResults = [];

getJson({
  engine: "google_scholar",
  q: "ESTRADA planejamento estratégico", 
  api_key: process.env.SERPAPI_KEY,
}, (json) =>{
  // console.log(json["organic_results"][0].title);
	json["organic_results"].forEach(r => {
		const message = r.title + " - " + r.link
		filteredResults.push(message);
	});
	console.log(filteredResults);
});
