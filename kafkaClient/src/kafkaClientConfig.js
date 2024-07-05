const { Kafka, logLevel } = require('kafkajs');

const kafkaClient = new Kafka({
	clientId: 'my-app',
	logLevel: logLevel.DEBUG,
	brokers: ['maxsistem:9092'], //! Aqui usamos maxsistem ao invés de localhost
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

exports.kafkaAdmin = kafkaClient.admin();