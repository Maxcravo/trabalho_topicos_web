const { newKafkaConsumer } = require('./kafkaClientConfig');

async function treatData(data) {
	try {
		console.log(`treatData`);
		// TODO: tratar os dados
	
		return data;
		
	} catch (error) {
		throw error;
	}
}

exports.consumeMessages = async (req, res) => {
	console.log('[KafkaConsumer] [consumeMessages]');

	try {
		const { topics, groupId } = req.body;

		if (!topics || topics.length === 0) {
			throw new Error('topic vazio')
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
				console.log(`messageValue: `, message.value.toString());
				const treated = await treatData(message);
				treatedData.push(treated);
				},
		})

		function delay(time) {
			return new Promise(resolve => setTimeout(resolve, time));
		}
		
		await delay(5000)

		await kafkaConsumer.disconnect();
		
		res.status(200).send({
			treatedData: treatedData
		})

		/*
					const htmlContent = `
				<ul>
			${}
		`

			<ul style={{ display: flex }}>
				{
					treatedData.map((result) => {
						return(
							<li> dhauhdua </li>	
						)
					})
				}
			</ul>
		*/

		
	} catch (error) {
		console.log('error = ', error);
	}
}

exports.consumeMessages_V2 = async(req, res) => {
	/* implementar uma logica para impedir a deconexão do consumer. Ideia:
		criar uma variável que indica o status do percorrer de mensagens, e só desconectar o consumer quando essa variável for true.
		em vez de tratar os dados dentro do eachMessage, apenas dar push num novo array de mensagens e tratar esse array, pois assim conseguimos saber qual a ultima mensagem a ser percorrida e indicar na variável tornando ela TRUE.
	*/

	res.status(200).send('não implementado');
}
