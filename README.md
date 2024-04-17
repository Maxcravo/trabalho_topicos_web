# Trabalho_tópicos_web

Trabalho que será realizado na disciplina Tópicos Especiais Em Banco De Dados Para Web, onde vamos realizar um projeto envolvendo a utilização do kafka, bem como recuperação e classificação de dados.

## Links úteis

* [Apache Kafka - Quickstart](https://kafka.apache.org/quickstart)
* [KafkaJS - Getting Started](https://kafka.js.org/docs/getting-started)
* [Google Scholar API](https://serpapi.com/google-scholar-api)

## Informações Úteis

### Run Kafka Server

```
KAFKA_CLUSTER_ID="$(bin/kafka-storage.sh random-uuid)"
bin/kafka-storage.sh format -t $KAFKA_CLUSTER_ID -c config/kraft/server.properties
bin/kafka-server-start.sh config/kraft/server.properties
```

```
// Listar Tópicos no servidor kafka
$ ./bin/kafka-topics.sh --bootstrap-server=localhost:9092 --list

// Detalhes de um tópico
$ ./bin/kafka-topics.sh --bootstrap-server=localhost:9092 --describe --topic <nome-do-topico>
```
