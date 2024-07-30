function formatTopicName(srcString) {
	const clean = srcString.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, '');
	const formatted = clean.trim().replace(/\s\s+/g, ' ').replace(/\s/g, '-').toLowerCase();
	return formatted;
	// console.log('formatted: ', formatted);
}

const stopwords = [
	"a", "à", "ao", "aos", "as", "com", "da", "das", "de", "dos", "do", "e",
	"em", "entre", "para", "por", "que", "se", "um", "uma", "uns", "umas", "o",
	"os", "do", "dos", "pela", "pelo", "sem", "esta", "este", "aquela",
	"aquele", "aquelas", "aqueles", "mais", "menos", "muito", "muita", "muitos",
	"muitas", "onde", "quando", "como", "qual", "quais", "quem", "esse", "essa",
	"esses", "essas", "seu", "sua", "seus", "suas", "lá", "aqui", "já", "também",
	"ainda", "só", "assim", "muito", "pouco", "nada", "tudo", "algum", "alguma",
	"alguns", "algumas", "outro", "outra", "outros", "outras"
];

function filterStopwords(srcTokens) {
	console.log('[filterStopwords]')
	return srcTokens.filter((token) => {
		const isStopword = stopwords.includes(token);
		return isStopword ? null : token;
	})
}

function filterData(data, topicName) {
	try {
		console.log(`[filterData]`);
	
		const topicTokens = topicName.replace(/[-]/g, ' ').split(' ');
		console.log('topicTokens: ', topicTokens);

		const filteredTokens = filterStopwords(topicTokens);
		console.log('filteredTokens: ', filteredTokens);

		const filteredResults = data.map((schResult) => {
			let titleHasAllTokens = 0;
			filteredTokens.forEach((token) => {
				schResult.value.title.includes(token) ? titleHasAllTokens =+1 : null;
				console.log('token: ', token)
				console.log('title has token: ', schResult.value.title.includes(token))
			})

			console.log('titleHasAllTokens === filteredTokens.length: ', titleHasAllTokens === filteredTokens.length)
			return titleHasAllTokens === filteredTokens.length ? schResult : null;
		})

		return filteredResults;

	} catch (error) {
		throw error;
	}
}

async function testScholar() {
	console.log('teste');
	const scholarBaseURL = 'http://localhost:3001';
	const query = 'Administração do Tempo';
	const topic = formatTopicName(query);

	console.log('topicName: ', topic)

	const hds = new Headers({
		'Content-type': 'application/json; charset=UTF-8',
	})

	const scholarResponse = await fetch(`${scholarBaseURL}/search`, {
		method: 'POST',
		body: JSON.stringify({ query: query, numberOfResults: 20 }),
		headers: hds
	}).then((res) => {
		return res.json();
	});
	
	// console.log('scholarResponse: ', scholarResponse)

	// formatar os dados em forma de mensagem kafka
	const messages = scholarResponse.result.map((result, index) => {
		return {
			key: index.toString(),
			value: result
		}
	});

	// console.log('messages: ', messages)
	console.log('messages[5].value.publication_info: ', messages[5].value.publication_info)
	console.log('messages[5].value.inline_links: ', messages[5].value.inline_links)

	console.log('messages[4].value.publication_info: ', messages[4].value.publication_info)
	console.log('messages[4].value.inline_links: ', messages[4].value.inline_links)

	console.log('messages[8].value.publication_info: ', messages[8].value.publication_info)
	console.log('messages[8].value.inline_links: ', messages[8].value.inline_links)
	// const treatedData = filterData(messages, topic);
	// console.log('treatedData: ', treatedData)
}


async function runTest() {
	// formatTopicName(query);
	await testScholar();
}

runTest();