const query_text = document.getElementById("query_text");
const submit = document.querySelector("#submit_button");

async function handleSearch({ query, numberOfResults = 15 }) {
  try {
    //! ver se tem a query 
    if (!query) {
      throw new Error("não foi enviada query")
    }
    //! chama o scholar fetcher (const queryResults = await fetch scholar)
    // Passar na requisição o query
    const queryResults = await fetch("http://localhost:3001/")
    
    queryResults 
    
    // pegar os resultados do scholar fetcher e entrega para o producer colocar na fila do kafka
    // chamr o consumer para fazer o tratamento dos dados
    
  } catch (error) {
    alert(error);
  }
}

submit.addEventListener("click", ()=> {
  handleSearch({query:query_text.value});
  console.log(query_text.value);
})

