const { newKafkaConsumer } = require('./kafkaClientConfig');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemApiKey = process.env.GEMAPI_KEY;
const genAI = new GoogleGenerativeAI(gemApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runAI(prompt) {
	const result = await model.generateContent(prompt);
	const response = await result.response;
	return response.text();
} 

async function treatData(messageValue) {
	try {
		console.log(`treatData`);
		console.log("messageValue: ", messageValue);
		const result = JSON.parse(messageValue)
		console.log("result: ", result);
		
		const formattedResult = {
			title: result.title,
			link: result.link,
			citations: result?.inline_links?.cited_by?.total ? result?.inline_links?.cited_by?.total : 0,
			keyWords: []
		}

		const getContentKeyWords = `Gere três palavras-chave em Português-BR com base nesses dois textos: "${result.title}" e "${result.snippet}. Retorne no formato ["palavra1", "palavra2", "palavra3"].`

		const aiResponse = await runAI(getContentKeyWords);
		
		formattedResult.keyWords = JSON.parse(aiResponse);
		console.log('formattedResult.keyWords[0]: ', formattedResult.keyWords[0]);
	
		return formattedResult;
		
	} catch (error) {
		throw error;
	}
}

exports.consumeMessages = async (req, res) => {
	console.log('[KafkaConsumer] [consumeMessages]');

	try {
		const { topics, groupId } = req.body;

		if (!topics || topics.length === 0) {
			throw new Error('topics vazio')
		}

		const treatedData = [];

		const consumerGroup = groupId ? groupId : 'default';

		const kafkaConsumer = newKafkaConsumer(consumerGroup);

		await kafkaConsumer.connect();
		console.log(`consumer subscribe`);
		await kafkaConsumer.subscribe({ topics: topics, fromBeginning: true })
		console.log(`consumer run`);
		await kafkaConsumer.run({
			eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
				// console.log(`messageValue: `, message.value.toString());
				const treated = await treatData(message.value.toString());
				treatedData.push(treated);
				},
		})

		function delay(time) {
			return new Promise(resolve => setTimeout(resolve, time));
		}
		
		await delay(5000)

		await kafkaConsumer.disconnect();

		const htmlContent = `
			<ul style="display:flex; flex-direction: collumn"> 
				${treatedData.map((data)=>{
					return (`
						<li style="display:flex; flex-direction: collumn" >
							<h1>Titulo: ${data.title} </h1>
							<p>link: ${data.link}</p>
							<p>no citações: ${data.citations}</p>
							<p>palavra chave 1: ${data.keyWords[0]}</p>
							<p>palavra chave 2: ${data.keyWords[1]}</p>
							<p>palavra chave 3: ${data.keyWords[2]}</p>
						</li>
					`)
				})}  
			</ul>
		`
		
		res.status(200).send({ htmlContent });
		
	} catch (error) {
		console.log('error = ', error);
	}
}