# Fluxo de operação do projeto

## Resumo

O projeto estará contido em um container Docker, separado em serviços independentes:

* ScholarFetch -> Serviço que requisita API de integração com o Google Scholar, a fim de realizar pesquisas neste serviço.
* KafkaProducer -> Serviço que requisita o serviço anterior e envia os resultados da pesquisa para uma fila do Kafka.
* KafkaConsumer -> Serviço que lê as filas do kafka e realiza o tratamento dos dados.

## Descrição dos Serviços

### ScholarFetcher

```js
/** Fetch Scholar API
 * @name fetchScholarAPI
 * @param {String} query 
 * @returns {Array}
 */

```

### KafkaProducer

```js
/** Get Query Results
 * @name getQueryResults
 * @description Get query results and put them in a kafka queue (given topic)
 * @param {String} query 
 * @param {String} topic 
 * @returns {null}
 */

```

### KafkaConsumer

```js
/** Read Kafka Queue
 * @name readKafkaQueue
 * @description Read the messagens in a kafka queue (given topic)
 * @param {String} topic 
 * @returns {Array<String>}
 */

/** Treat Data
 * @name treatData
 * @description Treat the given Data
 * @param {Array<any>} data 
 * @returns {any}
 */

```