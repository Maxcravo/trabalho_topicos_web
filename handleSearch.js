const query_text = document.getElementById("query_text");
const submit = document.querySelector("#submit_button");

const scholarBaseURL = 'http://localhost:3001';
const producerBaseURL = 'http://localhost:3002';
const consumerBaseURL = 'http://localhost:3003';

const hds = new Headers({
  'Content-type': 'application/json; charset=UTF-8',
})

function createTopicName(srcString) {
  const clean = srcString.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9 ]/g, '');
  const formatted = clean.trim().replace(/\s\s+/g, ' ').replace(/\s/g, '-').toLowerCase();
  return formatted;
}

async function handleSearch({ query, numberOfResults = 10 }) {
  console.log('[handleSearch]');
  try {
    if(!query) {
      throw new Error('Insira uma busca')
    }

    console.log('[handleSearch] query: ', query);

    // acessar o serviço do scholar para fazer uma busca
    const queryResults = await fetch(`${scholarBaseURL}/search`, {
      method: 'POST',
      body: JSON.stringify(query),
      headers: hds
    }).then((res) => {
      return res.json();
    });

    console.log('[handleSearch] queryResults: ', queryResults);

    // criando o nome do tópico com base na busca do usuário
    const topicName = createTopicName(query);

    console.log('[handleSearch] producerPayload: ', { topic: topicName, data: queryResults });
    
    // inserir os dados sem tratamento na fila do kafka através do Producer
    const producerRes = await fetch(`${producerBaseURL}/produce-messages`, {
      method: 'POST',
      body: JSON.stringify({ topic: topicName, data: queryResults }),
      headers: hds
    }).then((res) => {
      return res.json();
    });

    console.log('[handleSearch] producerRes: ', producerRes);

    if (producerRes.status !== 200) {
      throw new Error('Erro ao produzir mensagens');
    }

    await fetch(`${consumerBaseURL}/consume-messages`, {
      method: 'POST',
      body: JSON.stringify({ topic: topicName }),
      headers: hds
    }).then((res) => {
      return res.json();
    });
    // todo: ver se aqui tem que retornar o res.json pq vai retornar o html
    
  } catch (error) {
    alert(error);
  }
}

submit.addEventListener("click", ()=> {
  handleSearch({query:query_text.value});
  console.log(query_text.value);
})

