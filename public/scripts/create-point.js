function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res =>  res.json() )    
        .then( states => {
            for(state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        } )
}
populateUFs();

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = false;

    fetch(url)
        .then(res =>  res.json() )    
        .then( cities => {
            
            for(city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false;
        } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

//itens de coleta
//pegar todos os li`s
const itensToCollected = document.querySelectorAll('.itens-grid li');

for(const item of itensToCollected) {
    item.addEventListener("click", handleSelectedItem);
}

//atualizar o campo escondido com os itens selecionados
const collectedItens = document.querySelector("input[name=item]")

let selectItens = [];

function handleSelectedItem(event) {
    const itemLi = event.target;

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;
    console.log('Item ID: ', itemId);

    
    //verifica se tem itens selecionados, se sim pegar itens selecionados
    const alreadySelected = selectItens.findIndex(item => {
        const itemFound = item == itemId; //isso sera true ou false
        return itemFound; // retorna true ou false
    })
    console.log()

    //se ja estiver selecionado tirar da selecao
    if(alreadySelected >= 0){
        //tirar da selecao
        const filteredItens = selectItens.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectItens = filteredItens;
    } else{ //se nao estiver selecionado tirar a selecao
        selectItens.push(itemId);
    }
    console.log('selectedItens: ', selectItens);
    
    //atualizar o campo escondido com os itens selecionados
    collectedItens.value = selectItens;

}