//! Importar o handleSearch aqui 
import handleSearch from "../handleSearch"

export default function sendData() {
  let number_results = document.getElementById("query_quantity").value
  let query = document.getElementById("query_text").value
  let submit = document.getElementById("submit_button").onclick
  const results = {
    query: query,
    numberOfResults: number_results
  }
  //TODO colocar condição onclick do button de submit
  if (submit) {
    handleSearch(results)
  }

  
return results
}