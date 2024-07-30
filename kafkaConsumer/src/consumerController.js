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

let messagesCounter = 0;

async function treatData(messageValue) {
	try {
		console.log(`treatData`);
		const result = JSON.parse(messageValue)
		// console.log("result: ", result);
		
		const formattedResult = {
			title: result.title,
			link: result.link,
			citations: result?.inline_links?.cited_by?.total ? result?.inline_links?.cited_by?.total : 0,
			keyWords: []
		}

		const getContentKeyWords = `Gere três palavras-chave em Português-BR com base nesses dois textos: "${result.title}" e "${result.snippet}. Retorne no formato ["palavra1", "palavra2", "palavra3"].`

		const aiResponse = await runAI(getContentKeyWords);
		
		formattedResult.keyWords = JSON.parse(aiResponse);

		messagesCounter += 1;
	
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

		await kafkaConsumer.subscribe({ topics: topics, fromBeginning: true })

		await kafkaConsumer.run({
			eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
				const treated = await treatData(message.value.toString());
				treatedData.push(treated);
			},
		})

		function delay(time) {
			return new Promise(resolve => setTimeout(resolve, time));
		}

		while (messagesCounter < 20) {
			console.log('messagesCounter: ', messagesCounter);
			await delay(1000)
		}

		await kafkaConsumer.disconnect();

		const htmlContent = `
			<ul style="display:flex; flex-direction: collumn"> 
				${treatedData.map((data)=>{
					return (`
						<li style="display:flex; flex-direction: collumn" >
							<h3><b>Titulo: </b> ${data.title} </h3>
							<p><b>Link:</b> <a href="${data.link}"> ${data.link} </a></p>
							<p><b>Número de citações: </b> ${data.citations}</p>
							<p><b>Palavras chave:</b> ${data.keyWords[0]},${data.keyWords[1]}, ${data.keyWords[2]} </p>
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