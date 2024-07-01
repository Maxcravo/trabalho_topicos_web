const { Kafka, logLevel } = require('kafkajs');

const kafkaClient = new Kafka({
	clientId: 'my-app',
	logLevel: logLevel.DEBUG,
	brokers: ['localhost:9092'],
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

module.exports = kafkaClient