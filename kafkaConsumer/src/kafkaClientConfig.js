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

const newKafkaConsumer = (groupId) => kafkaClient.consumer({ 
	groupId,
	allowAutoTopicCreation: false
});

module.exports = {newKafkaConsumer}