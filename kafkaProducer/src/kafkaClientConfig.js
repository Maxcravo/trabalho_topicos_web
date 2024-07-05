const { Kafka, Partitioners, logLevel } = require('kafkajs');

const kafkaClient = new Kafka({
	clientId: 'my-app',
	logLevel: logLevel.DEBUG,
	brokers: ['maxsistem:9092'],
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

export const newKafkaProducer = () => kafkaClient.producer({ 
	createPartitioner: Partitioners.DefaultPartitioner,
	allowAutoTopicCreation: true 
});