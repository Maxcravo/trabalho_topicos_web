require('dotenv/config')

/* scholar api */
const scholarFetcher = require('./scholarFetcher');

async function test() {
	const results = await scholarFetcher.fetchScholarAPI("deep learning");
	// enviar pro producer etc
	console.log(`results = ${JSON.stringify(results)}`);
}

test();

/* KAFKA */
// const { newKafkaProducer, newKafkaConsumer, admin } = require('./kafkajsConfig.js');

// const myProducer = newKafkaProducer();

// const myConsumer = newKafkaConsumer('test-group');
// const myadmin = admin();

// async function createArticleTopic() {
//   await myProducer.connect();
//   await myProducer.send({
//     topic: 'test-article',
//     messages: [
//       {value: 'test2'}
//     ]
//   })

// }

// createArticleTopic();

// async function readMessages() {
//   myConsumer.connect();
//   await myConsumer.subscribe({ topic: 'test-article', fromBeginning: true })

//   await myConsumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         value: message.value.toString(),
//       })
//     },
//   })
// }

// readMessages()

// async function deleteTopics(topics) {
//   console.log("delete topics");
//   myadmin.connect()
// 	await myadmin.listTopics()

// 	await myadmin.deleteTopics({
// 		topics
// 	})
// 	await myadmin.listTopics()

// 	myadmin.disconnect()
// }

// deleteTopics(["test-article"])
