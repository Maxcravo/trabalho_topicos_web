const { newKafkaConsumer } = require('./kafkaClientConfig');

async function treatData(data) {
	try {
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

		await kafkaConsumer.subscribe({ topics: topics, fromBeginning: true })

		await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
			const treated = treatData(message);
			treatedData.push(treated);
     	},
		})

		await kafkaConsumer.disconnect();
		
		res.status(200).send({
			treatedData: treatedData
		})
		
	} catch (error) {
		console.log('error = ', error);
	}
}

