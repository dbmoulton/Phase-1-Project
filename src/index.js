let divCollect = document.querySelector('#toy-collection')


function getAmiibo() {
    return fetch('https://www.amiiboapi.com/api/amiibo')
      .then(res => res.json())
}

function renderAmiibo(amiibo) {
  let h2 = document.createElement('h2')
  h2.innerText = amiibo.name

  let img = document.createElement('img')
  img.setAttribute('src', amiibo.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `Game Series: ${amiibo.gameSeries} \n Amiibo Series: ${amiibo.amiiboSeries}`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', amiibo.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p)
  divCollect.append(divCard)
}


getAmiibo().then(amiibos => {
  console.log(amiibos)
  amiibos.amiibo.forEach(data => {
    renderAmiibo(data)
  })
})


