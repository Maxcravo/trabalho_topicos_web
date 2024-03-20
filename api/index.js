const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

async function producerConnect() {
await producer.connect()
await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()
}

producerConnect();

// const consumer = kafka.consumer({ groupId: 'test-group' })

// async function ProducerConsumer() {
//   await consumer.connect()
//   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

// await consumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     console.log({
//       value: message.value.toString(),
//     })
//   },
// })
// }

// ProducerConsumer();
