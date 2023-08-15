
let userPlaylist = [];
playlistSize = 0;

function getSong() {

  let songTitle = document.getElementById('songTitleTextField').value.trim()
  console.log('songTitle: ' + songTitle)
  if (songTitle === '') {
    return alert('Please enter a Song Title')
  }

  let songsDiv = document.getElementById('songs_div')
  songsDiv.innerHTML = ''

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {


    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //console.log(response)

      displaySongResults(response)

    }
    songsDiv.innerHTML = `Songs matching: ${songTitle}`
  }
  xhr.open('GET', `/songs?title=${songTitle}`, true)
  xhr.send()
}



let songResults = [];

function displaySongResults(response) {
  songResults = [];

  let songsTable = document.getElementById('songs-table')
  songsTable.innerHTML = ''

  for (let index = 0; index < 20; index++) {


    let newButton = document.createElement("button")
    newButton.innerHTML = "&#10133"
    newButton.addEventListener("click", function handleClick(event) {
      playlistAddSong(response, index)
    })

    let newSongRow = songsTable.insertRow(0);
    newSongRow.insertCell(0).appendChild(newButton)
    newSongRow.insertCell(1).innerHTML = response.results[index].trackName
    newSongRow.insertCell(2).innerHTML = response.results[index].artistName
    newSongRow.insertCell(3).innerHTML = `<img src="${response.results[index].artworkUrl30}"/>`
  }

}

function playlistAddSong(response, index) {
  var playlistTable = document.getElementById("playlist-table")

  let removeButton = document.createElement("button")
  let upButton = document.createElement("button")
  let downButton = document.createElement("button")

  removeButton.innerHTML = "&#10134"
  upButton.innerHTML = "&#9195"
  downButton.innerHTML = "&#9196"

  removeButton.addEventListener("click", function handleClick(event) {
    playlistRemoveSong()
  })
  upButton.addEventListener("click", function handleClick(event) {
    moveSongUp()
  })
  downButton.addEventListener("click", function handleClick(event) {
    moveSongDown()
  })
  

  let newSongRow = playlistTable.insertRow(0);
  let c1 = newSongRow.insertCell(0)
  c1.appendChild(upButton)
  c1.appendChild(downButton)
  c1.appendChild(removeButton)
  newSongRow.insertCell(1).innerHTML = response.results[index].trackName
  newSongRow.insertCell(2).innerHTML = response.results[index].artistName
  newSongRow.insertCell(3).innerHTML = `<img src="${response.results[index].artworkUrl30}"/>`
  
  // localStorage.setItem(playlistSize,response.results[index])
  // playlistSize++;
  //userPlaylist.push({data: response.results[index]})
}

function playlistRemoveSong() {

  // var playlistTable = document.getElementById("playlist-table")
  // playlistTable.innerHTML = ''
  // temp = []
  // for(let song of userPlaylist){
  //   if(song.id !== id){
  //     let removeButton = document.createElement("button")
  //     let upButton = document.createElement("button")
  //     let downButton = document.createElement("button")
    
  //     removeButton.innerHTML = "&#10134"
  //     upButton.innerHTML = "&#9195"
  //     downButton.innerHTML = "&#9196"
    
  //     removeButton.addEventListener("click", function handleClick(event) {
  //       playlistRemoveSong()
  //     })
  //     upButton.addEventListener("click", function handleClick(event) {
  //       moveSongUp()
  //     })
  //     downButton.addEventListener("click", function handleClick(event) {
  //       moveSongDown()
  //     })
      
    
  //     let newSongRow = playlistTable.insertRow(0);
  //     let c1 = newSongRow.insertCell(0)
  //     c1.appendChild(upButton)
  //     c1.appendChild(downButton)
  //     c1.appendChild(removeButton)
  //     newSongRow.insertCell(1).innerHTML = song.data.trackName
  //     newSongRow.insertCell(2).innerHTML = song.data.artistName
  //     newSongRow.insertCell(3).innerHTML = `<img src="${song.data.artworkUrl30}"/>`


  //   }
  // }

  //log these targets

  let userTargetTable = event.target.parentNode //
  //console.log(userTargetTable)
  let removeRow = userTargetTable.parentNode
  //console.log(removeRow)

  removeRow.parentNode.removeChild(removeRow)

}

function moveSongUp() {
  var userTargetTable = event.target.parentNode
  //console.log(userTargetTable)
  var userTargetRow = userTargetTable.parentNode
  //console.log(userTargetRow)

  aboveRow = userTargetRow.previousElementSibling
  userTargetRow.parentNode.insertBefore(userTargetRow, aboveRow)

}

function moveSongDown() {
  var userTargetTable = event.target.parentNode
  //console.log(userTargetTable)
  var userTargetRow = userTargetTable.parentNode
  //console.log(userTargetRow)
  belowRow = userTargetRow.nextElementSibling
  userTargetRow.parentNode.insertBefore(belowRow, userTargetRow)

}



//Attach Enter-key Handler
const ENTER = 13

function handleKeyUp(event) {
  event.preventDefault()
  if (event.keyCode === ENTER) {
    document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)

})

