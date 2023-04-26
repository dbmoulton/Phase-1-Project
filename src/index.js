let divCollect = document.querySelector('#toy-collection')
let gameDropdown = document.querySelector('#gameSelection')
let amiiboData = null
let selectedGameSeries = "blank"
var card = document.getElementById("toy-collection");


function getAmiibo() {
    return fetch('https://www.amiiboapi.com/api/amiibo')
      .then(res => res.json())
}

function makeGameList(){
  let addedGames = []
  amiiboData.forEach(data => {
    if(!isGameInList(data.gameSeries, addedGames)) {
      addGame(data, addedGames)
    }
  })

}

function isGameInList(name, addedGames) {
  return addedGames.indexOf(name) !== -1
}

function addGame(amiibo, addedGames){
  let gameOption = document.createElement('option')
  gameOption.setAttribute('value', amiibo.gameSeries)
  gameOption.innerText = `${amiibo.gameSeries}`
  gameDropdown.append(gameOption)
  addedGames.push(amiibo.gameSeries)
}

function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function renderAmiibo() {
  removeChildren(divCollect)
  amiiboData.forEach(data => {
    conditionalRender(data)
  })
}

function conditionalRender(amiibo) {
  if((selectedGameSeries !== amiibo.gameSeries) && (selectedGameSeries !== "blank")) {
    return
  }
  renderAmiiboHtml(amiibo) 
}

function renderAmiiboHtml(amiibo) {
  let h2 = document.createElement('h2')
  h2.innerText = amiibo.name

  let img = document.createElement('img')
  img.setAttribute('src', amiibo.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `Game Series: ${amiibo.gameSeries} \n Amiibo Series: ${amiibo.amiiboSeries}`

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p)
  divCollect.append(divCard)
}




function intData() {
  getAmiibo().then(amiibos => {
  amiiboData = amiibos.amiibo
  renderAmiibo()
  makeGameList()
  })
}

function intEventListeners() {
  document.querySelector('#gameSelection').addEventListener("change", (event) =>{
    selectedGameSeries = event.target.value
    renderAmiibo()

  })
}

function intMouseOver() {
  divCollect.addEventListener('mouseover',function(){
    divCollect.class="card-2";
 })
 divCollect.addEventListener('mouseleave',function(){
  divCollect.class="card";
 })
}


document.addEventListener("DOMContentLoaded", (event) => {
  intData()
  intEventListeners()
  intMouseOver()
});