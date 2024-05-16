const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092'],
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

const newKafkaProducer = () => kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner, allowAutoTopicCreation: false });
const newKafkaConsumer = (groupId) => kafka.consumer({ groupId, allowAutoTopicCreation: false });

const admin = kafka.admin();

module.exports = {
	admin,
	newKafkaProducer,
	newKafkaConsumer
}
