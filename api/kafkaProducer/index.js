const ip = require("ip")

const { Kafka, CompressionTypes, logLevel } = require('kafkajs')

const host = 'localhost:' // process.env.HOST_IP || ip.address()

//-------------------- código de teste

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: 'example-producer',
})

const topic = 'topic-test'
const producer = kafka.producer()

const getRandomNumber = () => Math.round(Math.random(10) * 1000)
const createMessage = num => ({
  key: `key-${num}`,
  value: `value-${num}-${new Date().toISOString()}`,
})

const sendMessage = () => {
  return producer
    .send({
      topic,
      compression: CompressionTypes.GZIP,
      messages: Array(getRandomNumber())
        .fill()
        .map(_ => createMessage(getRandomNumber())),
    })
    .then(console.log)
    .catch(e => console.error(`[example/producer] ${e.message}`, e))
}

const run = async () => {
  await producer.connect()
  setInterval(sendMessage, 3000)
}

run().catch(e => console.error(`[example/producer] ${e.message}`, e))

// ----------------- 


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