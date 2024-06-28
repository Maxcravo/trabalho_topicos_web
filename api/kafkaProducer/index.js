const ip = require("ip")

const { Kafka, CompressionTypes, logLevel } = require('kafkajs')

const host = 'localhost:' // process.env.HOST_IP || ip.address()

async function kafkaProducer() {
	try {
		console.log('kafkaProducer');
		return;

	} catch (error) {
		console.log(`error = ${JSON.stringify(error)}`);
	}
}

module.exports = {
	kafkaProducer
}