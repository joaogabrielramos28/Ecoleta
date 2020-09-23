function populateUFs(){
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {


        for(state of states){
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        

    } ) 
}

populateUFs()


function getcities(event){
    const cityselect = document.querySelector("select[name=city]")
    const stateinput = document.querySelector("input[name=state]")
    

    const indexofselectedstate = event.target.selectedindex
    const ufvalue = event.target.value
    stateinput.value = event.target.options[indexofselectedstate]

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/distritos`

    cityselect.innerHTML = "<option value>Selecione a Cidade</option>"
    cityselect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        


        for(city of cities){
            cityselect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        
        cityselect.disabled = false
    } ) 


}


    document
    .querySelector("select[name=uf]")
    .addEventListener("change",getcities)
      

    //itens de coleta
    //pegar todos os li's

    
    const itemstocollect = document.querySelectorAll(".items-grid li")
    for (const item of itemstocollect){
        item.addEventListener("click", handleselecteditem)

    }

const collecteditems = document.querySelector("input[name=items]")


let selecteditems = []





function handleselecteditem(event){
    const itemli = event.target

    // adicionar ou remover uma classe com javascript
    itemli.classList.toggle("selected")

    const itemid = itemli.dataset.id

    

    // verificar se exitem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadyselected = selecteditems.findIndex( item => {
        const itemfound = item == itemid
        return itemfound


    })


    //se ja estiver selecionado,

    if(alreadyselected >= 0){
        // tirar da selecao

        const filtereditems = selecteditems.filter(item => {
            const itemisdifferent= item != itemid // false
           
            return itemisdifferent
        })
        
        selecteditems = filtereditems
         
    }else {
         //se nao tiver selecionado,adicionar a 
         selecteditems.push(itemid)
    

   
    }

    //atualizar o campo escondido com os itens selecionados

    collecteditems.value = selecteditems
}



