const { Kafka, Partitioners } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'my-app',
	brokers: ['localhost:9092'],
})

const newKafkaProducer = () => kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })

const newKafkaConsumer = (groupId) => kafka.consumer({groupId});

const admin = () => kafka.admin() 

module.exports = {
	admin,
	newKafkaProducer,
	newKafkaConsumer
}

// async function connectProducer() {
// 	await producer.connect()
// 	await producer.send({
// 		topic: 'article',
// 		messages: [
// 			{ value: 'Hello KafkaJS user!' },
// 			{ value: 'Here\'s an article https://ieeexplore.ieee.org/abstract/document/10213406!' },
// 		],
// 	})

// 	await producer.disconnect()
// }

// connectProducer()


// const consumer = kafka.consumer({ groupId: 'test-group' })

// async function connectConsumer() {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'article', fromBeginning: true })

// 	await consumer.run({
// 		eachMessage: async ({ topic, partition, message }) => {
// 			console.log({
// 				value: message.value.toString(),
// 			})
// 		},
// 	})
// }

// connectConsumer();
