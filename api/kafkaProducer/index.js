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