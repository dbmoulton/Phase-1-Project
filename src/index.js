let divCollect = document.querySelector('#toy-collection')
let gameDropdown = document.querySelector('#gameSelection')
let amiiboData = null
let selectedGameSeries = "blank"
let searchInput = ""
let searchBar = document.querySelector(`#myInput`)

function getAmiibo() {
    return fetch('https://www.amiiboapi.com/api/amiibo')
      .then(res => res.json())
}


// create an array for the dropdown
function makeGameList(){
  let addedGames = []
  amiiboData.forEach(data => {
    if(!isGameInList(data.gameSeries, addedGames)) {
      addGame(data, addedGames)
    }
  })

}

// prevent duplicates in dropdown aray
function isGameInList(name, addedGames) {
  return addedGames.indexOf(name) !== -1
}

// create drodown list
function addGame(amiibo, addedGames){
  let gameOption = document.createElement('option')
  gameOption.setAttribute('value', amiibo.gameSeries)
  gameOption.innerText = `${amiibo.gameSeries}`
  gameDropdown.append(gameOption)
  addedGames.push(amiibo.gameSeries)
}

// clear cards
function removeChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// grab json data
function renderAmiibo() {
  removeChildren(divCollect)
  amiiboData.forEach(data => {
    conditionalRender(data)
  })
}

// selectively render cards
function conditionalRender(amiibo) {
  // if((selectedGameSeries !== amiibo.gameSeries) && (selectedGameSeries !== "blank")) {
  //   return
  // }
  if((searchInput !== "") && (amiibo.Name.toLowerCase().includes(searchInput))) {
    return
  }
  renderAmiiboHtml(amiibo) 
}

// create cards
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

// initialize json data
function intData() {
  getAmiibo().then(amiibos => {
  amiiboData = amiibos.amiibo
  renderAmiibo()
  makeGameList()
  })
}

// event listener for dropdown filter
function intEventListeners() {
  gameDropdown.addEventListener("change", (event) =>{
    selectedGameSeries = event.target.value
    renderAmiibo()

  })
}

// event listener for card style change
function intMouseOver() {
  div.card.addEventListener('mouseover', (event) => {
    div.card.class = "card-2";
 })
 div.card.addEventListener('mouseleave', (event) => {
  div.card.class = "card";
 })
}

// event listenter for seachbar
function intSearchBar() {
  searchBar.addEventListener("keyup", (event) => {
    searchInput = searchBar.value;
    searchInput = searchInput.toLowerCase();
    renderAmiibo()
  })
}


document.addEventListener("DOMContentLoaded", (event) => {
  intData()
  intEventListeners()
  intMouseOver()
  intSearchBar()
});