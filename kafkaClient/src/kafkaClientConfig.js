const { Kafka, logLevel } = require('kafkajs');
require("dotenv").config()
const hostIp = process.env.HOST_IP 

const kafkaClient = new Kafka({
	clientId: 'my-app',
	logLevel: logLevel.DEBUG,
	brokers: [`${hostIp}:9092`], //! Aqui usamos maxsistem ao invés de localhost
	retry: {
    initialRetryTime: 100,
    retries: 5
  }
})

exports.kafkaAdmin = kafkaClient.admin();