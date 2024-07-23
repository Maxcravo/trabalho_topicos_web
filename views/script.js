//! Importar o handleSearch aqui 

export default function sendData() {
  let number_results = document.getElementById("query_quantity").value
  let query = document.getElementById("query_text").value
  //TODO colocar condição onclick do button de submit
  const results = {
    query: query,
    numberOfResults: number_results
  }
return results
}