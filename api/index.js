require('dotenv/config');

const { newKafkaConsumer, newKafkaProducer, admin } = require('./kafkajsConfig');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.write("Heloo Kafka");
	res.end();
});

async function adminInit() {
	admin.connect();
	await admin.createTopics({
		topics: [
			{
				topic: 'test.topic2',
				numPartitions: 2,
				// replicationFactor: 1
			},
		],
	});
	await admin.disconnect();
}

async function producerInit() {
  const producer = newKafkaProducer();
  await producer.connect();
 
  await producer.send({
    topic: 'test.topic2',
    messages: [
      {
        partition: 0,
        key: 'just-a-key-3',
        value: 'Hello Kafka 3!', 
      },
			{
        partition: 0,
        key: 'just-a-key-4',
        value: 'Hello Kafka 4!',
      },
    ],
  });
  await producer.disconnect();
}

async function consumerInit() {
	const consumer = newKafkaConsumer({ groupId: 'test-group' });
	await consumer.connect();

	await consumer.subscribe({ topics: ['test.topic'], fromBeginning: true });

	await consumer.run({
		eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
			console.log({
				topic,
				partition,
				key: message.key.toString(),
				value: message.value.toString(),
			});
		},
	});


	// console.log(`describeGroup = ${JSON.stringify(await consumer.describeGroup())}`);

	// const topic = 'topic.test'
	// const consumer = newKafkaConsumer({ groupId: 'test-group' })
	
	// const run = async () => {
	// 	await consumer.connect()
	// 	await consumer.subscribe({ topic, fromBeginning: true })
	// 	await consumer.run({
	// 		eachMessage: async ({ topic, partition, message }) => {
	// 			const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
	// 			console.log(`- ${prefix} ${message.key}#${message.value}`)
	// 		},
	// 	})
	// }
	
	// run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
	
}

async function test(){
	// await adminInit();
	await producerInit();
	await consumerInit();

	await admin.connect();
	console.log(`topicMeta = ${JSON.stringify(await admin.fetchTopicMetadata({ topics: ['test.topic2']}))}`);
	await admin.disconnect();
}

test();

/* scholar api */
// const scholarFetcher = require('./scholarFetcher');

// async function test() {
// 	const results = await scholarFetcher.fetchScholarAPI("deep learning");
// 	// enviar pro producer etc
// 	console.log(`results = ${JSON.stringify(results)}`);
// }

// test();

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
