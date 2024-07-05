const { newKafkaProducer } = require('./kafkaClientConfig');

exports.produceMessages = async (req, res) => {
  console.log('[KafkaProducer] [produceMessages]');

  try {
		const { topic, messages } = req.body;

		if(!topic || !messages || messages.length === 0) {
			throw new Error('!topic || !messages');
		}

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
