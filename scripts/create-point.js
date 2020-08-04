// FORMULARIO DE CADASTRO
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
      }

    })
}

populateUFs()


function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option value>Selecione à cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }

      citySelect.disabled = false

    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


// ITENS DE COLETA
let selectedItems = []
// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

function handleSelectItem(event) {
  const itemLi = event.target

  // adicionar ou remover uma classe com js
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // verificar se existem itens selecionados,
  // se sim pagar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item === itemId
    return itemFound
  })

  // se ja estiver selecionado adiciona ou remove
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  }
  else {
    selectedItems.push(itemId)
  }

  collectedItems.value = selectedItems
}

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectItem)
}
