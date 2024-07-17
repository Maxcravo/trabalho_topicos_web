const { Kafka, Partitioners, logLevel } = require('kafkajs');
require("dotenv").config()
const hostIp = process.env.HOST_IP 
console.log(hostIp);


const kafkaClient = new Kafka({
	clientId: 'my-app',
	logLevel: logLevel.DEBUG,
	brokers: [`${hostIp}:9092`],
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

const newKafkaProducer = () => kafkaClient.producer({ 
	createPartitioner: Partitioners.DefaultPartitioner,
	allowAutoTopicCreation: true 
});

module.exports = {newKafkaProducer}