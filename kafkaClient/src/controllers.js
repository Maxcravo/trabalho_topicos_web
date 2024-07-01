const { kafkaAdmin } = require("./kafkaClientConfig")

/* formato topicsData
	topicsData = [
		{
			topic: string
			numPartitions: number, // número de partições; opcional
			replicationFactor: number // fator de replicação; opcional
		}
	]
*/
exports.createTopics = async (req, res) => {
	console.log('[createTopics]');
  try {
		const { topicsData } = req.body;

		if(topicsData.length === 0) {
			throw new Error('topicsData vazio');
		}
		
    await kafkaAdmin.connect();
		
    await kafkaAdmin.createTopics({
			topics: topicsData
  	})

		await kafkaAdmin.disconnect();

		res.status(201).send({
			message: 'Tópicos criados'
		})

  } catch (error) {
    console.log('error = ', error);
  }
}


exports.deleteTopics = async (req, res) => {
	console.log('[deleteTopics]');

  try {
		const { topicsNames } = req.body;
		
		if(topicsNames.length === 0) {
			throw new Error('topicsNames vazio');
		}
		
    await kafkaAdmin.connect();

		await kafkaAdmin.deleteTopics({
			topics: topicsNames
		})
		
		await kafkaAdmin.disconnect();

		res.status(200).send({
			message: 'Tópicos deletados'
		})
		
	} catch (error) {
		console.log('error = ', error);
	}
}

exports.fetchTopicsMeta = async (req, res) => {
	console.log('[fetchTopicsMeta]');
  try {
    const { topicsNames } = req.body;
    if (topicsNames.length === 0) {
      throw new Error("topicsNames está vazio")
    }
		
    await kafkaAdmin.connect();
    const topicsMetadata = []

    if (topicsNames.length > 1) {
      topicsNames.forEach(name => {
      	topicsMetadata.push(kafkaAdmin.fetchTopicMetadata(name));
      });
    }

    console.log(`topicsMetadata = ${JSON.stringify(topicsMetadata)}`);   
    await kafkaAdmin.disconnect();

    res.status(200).send({
      message: "Metadados dos tópicos obtida",
      result: topicsMetadata
    })

  } catch (error) {
   	console.log('error = ', error);
  }
}

exports.listTopics = async (req, res) => {
	console.log('[listTopics]');
  try {
    await kafkaAdmin.connect();
    const topics = await kafkaAdmin.listTopics()

    console.log(`topics = ${JSON.stringify(topics)}`);
		
    kafkaAdmin.disconnect();

    res.status(200).send({
      message: "Dados dos topicos listados",
      result: topics
    })
    
  } catch (error) {
   	console.log('error = ', error);
  }
}