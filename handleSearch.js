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
  console.log("TopicName: ", formatted);
  return formatted;
}

async function handleSearch({ query }) {
  console.log('[handleSearch]');
  try {
    if(!query) {
      throw new Error('Insira uma busca')
    }

    console.log('[handleSearch] query: ', query);

    // acessar o serviço do scholar para fazer uma busca
    const scholarResponse = await fetch(`${scholarBaseURL}/search`, {
      method: 'POST',
      body: JSON.stringify({ query: query }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((res) => {
      return res.json();
    });

    console.log('[handleSearch] scholarResponse: ', scholarResponse);

    // criando o nome do tópico com base na busca do usuário
    const topicName = createTopicName(query);

    console.log('[handleSearch] producerPayload: ', { topic: topicName, data: scholarResponse.result });
    
    // inserir os dados sem tratamento na fila do kafka através do Producer
    const producerRes = await fetch(`${producerBaseURL}/produce-messages`, {
      method: 'POST',
      body: JSON.stringify({ topic: topicName, data: scholarResponse.result }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else throw new Error('Erro ao produzir mensagens');
    });

    console.log('[handleSearch] producerRes: ', producerRes);

    const consumerResponse = await fetch(`${consumerBaseURL}/consume-messages`, {
      method: 'POST',
      body: JSON.stringify({ topics: [topicName] }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((res) => {
      console.log('Status Resposta Consumer: ', res.status)
      return res.json();
    });

    const resultsDiv = document.getElementById("results")
    resultsDiv.innerHTML = consumerResponse.htmlContent;
    
  } catch (error) {
    console.log("error-handleSearch: ", error);
    alert(error);
  }
}

submit.addEventListener("click", ()=> {
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = "<p>Carregando Resultados ...</p>"
  handleSearch({ query: query_text.value });
})

