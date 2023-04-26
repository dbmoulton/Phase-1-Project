let divCollect = document.querySelector('#toy-collection')
let gameDropdown = document.querySelector('#gameSelection')


function getAmiibo() {
    return fetch('https://www.amiiboapi.com/api/amiibo')
      .then(res => res.json())
}

function makeGameList(amiibo){
  let gameOption = document.createElement('option')
  if (gameDropdown.value === amiibo.gameSeries) continue;
  gameOption.setAttribute('value', amiibo.gameSeries)
  gameOption.innerText = `${amiibo.gameSeries}`
  gameDropdown.append(gameOption)
}

getAmiibo().then(amiibos => {
  console.log(amiibos)
  amiibos.amiibo.forEach(data => {
    makeGameList(data)
  })
})





function renderAmiibo(amiibo) {
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


// getAmiibo().then(amiibos => {
//   console.log(amiibos)
//   amiibos.amiibo.forEach(data => {
//     renderAmiibo(data)
//   })
// })


