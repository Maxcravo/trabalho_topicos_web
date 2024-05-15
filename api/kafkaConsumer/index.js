async function kafkaConsumer() {
	try {
		console.log('kafkaConsumer');
		return;

	} catch (error) {
		console.log(`error = ${JSON.stringify(error)}`);
	}
}

module.exports = {
	kafkaConsumer
}