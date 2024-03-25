const { newKafkaProducer, newKafkaConsumer } = require('./kafkajsConfig.js');

const myProducer = newKafkaProducer();

const myConsumer = newKafkaConsumer('test-group');

async function createArticleTopic() {
  await myProducer.connect();
  await myProducer.send({
    topic: 'test-article',
    messages: [
      {value: 'Start of Topic'}
    ]
  })
}

createArticleTopic();

async function readMessages() {
  myConsumer.connect();
  await myConsumer.subscribe({ topic: 'test-article', fromBeginning: true })

  await myConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

readMessages();