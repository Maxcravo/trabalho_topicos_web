# Projeto Kakfa - Node.js - Docker

## Arquitetura

/trabalho_topicos_web
  / api (vamos desconsiderar)

  / 
  / scholarFetcher (container rodando o serviço de fetching) (projeto node)
  / kafkaClient (container rodando o serviço do kafka e com rotas para as funções de admin)
  / kafkaConsumer (container rodando o serviço do kafka consumer - rotas com funções de consumer)
  / kafkaProducer (container rodando  o serviço do kafka producer - rotas com funções de producer)
    * OBS: estudar a possibilidade de colocar o producer e o consumer em um só container que teria rotas diferentes para cada ocasião (consumir ou produzir)


https://kafka.js.org/docs/getting-started

```js
scholarFetcher = {

}

kafkaClient = {
  // como se fosse um admin
  // Aqui está a instância do kafka que vamos acessar.

  createConsumer: () => {},
  createProducer: () => {},
  createTopoic: () => {},
  deleteTopic: () => {},
  listTopics: () => {},
}

kafkaQueue = {
  // Juntar o consumer e o producer em uma projeto único.
  consumeTopic: () => {},
  produceMessage: () => {},
  streamMessages: () => {},

  // funções específicas do consumer e do producer
}
```