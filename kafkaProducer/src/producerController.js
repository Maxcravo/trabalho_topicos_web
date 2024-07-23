const { newKafkaProducer } = require('./kafkaClientConfig');

exports.produceMessages = async (req, res) => {
  console.log('[KafkaProducer] [produceMessages]');

  try {
		const { topic, data } = req.body;

		console.log('[KafkaProducer] [produceMessages] { topic, data }: ', { topic, data });

		if(!topic || !data || data.length === 0) {
			throw new Error('!topic || !data');
		}

		// formatar os dados em forma de mensagem kafka
		const messages = data.map((result, index) => {
			return {
				key: index, // Todo: ver se precisa ser string
				value: result
			}
		});

		console.log('[KafkaProducer] [produceMessages] messages: ', messages);

		const kafkaProducer = newKafkaProducer();

		await kafkaProducer.connect();

		await kafkaProducer.send({ topic, messages });

		await kafkaProducer.disconnect();

		res.status(200).send({
			message: 'mensagens enviadas'
		})
	
  } catch (error) {
    console.log('error = ', error);
  }
};
