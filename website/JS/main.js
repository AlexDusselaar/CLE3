window.addEventListener('load', init);
let ul = document.querySelector("#pages")
let section = document.querySelector("#pages-section")
let items = []
let stored= localStorage.getItem("watchlist")
let apiUrl = "../webservice/index.php"
let movieData = {};
ul.addEventListener("click", liClickHandler)

/**
 * Initialize the application
 */


// Hey guys dit is een gedeelte van de code van mijn eindopdracht met beetje aanpassing misschien dat jullie
// daar nogiets aan hebben om de accessibility paginas te displayen vanuit de webservice en zo niet dan ook goed
// voel je vrij om hier mee te kloten of het volledig weg te halen idc maar ja succes :D - Alex

function init()
{
    getData(apiUrl, logMovieData);
}

function getData(url, succesFunction){
    fetch(url)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.statusText0)
            }
            return response.json()
        })
        .then(succesFunction)
        .catch(errorHandler);
}

function logMovieData(data) {
    for (let result of data){

        let li = document.createElement("li")
        ul.append(li)

        let img = document.createElement("img")
        img.setAttribute("src",result.poster)
        img.setAttribute("alt","poster image")
        li.append(img)

        let p = document.createElement("p")
        p.innerText = result.name
        li.append(p)

        let movieDiv = document.createElement("div")
        li.append(movieDiv)

        let detailsButton = document.createElement("button")
        detailsButton.textContent = "Details"
        detailsButton.id = result.id
        detailsButton.classList.add("details")
        movieDiv.append(detailsButton)

        let watchlistButton = document.createElement("button")
        watchlistButton.classList.add("watchlist")
        watchlistButton.dataset.name = result.id
        watchlistButton.textContent = "Add to watchlist"
        movieDiv.append(watchlistButton)

        movieData[result.id] = result;
    }
    checkStorage()
}

function errorHandler(error){
    console.error(error.message)
}

function liClickHandler(event) {
    if (event.target.nodeName === "BUTTON") {

            // details
        if (event.target.className === "details") {
            let movie = movieData[event.target.id];

            let movieUrl = "../webservice/index.php?id=" + movie.id

            getData(movieUrl, modalSuccesHandler);

            // watchlist
        } else if (event.target.className !== "details") {
            let clickedItem = event.target;
                clickedItem.classList.toggle('on-watchlist');
                if (clickedItem.innerText === "On Watchlist") {
                    clickedItem.innerText = "Add to watchlist";
                    let itemIndex = items.indexOf(clickedItem.dataset.name)
                    items.splice(itemIndex, 1)
                    localStorage.setItem("watchlist", JSON.stringify(items))
                } else {
                clickedItem.innerText = "On Watchlist";
                items.push(clickedItem.dataset.name)
                    localStorage.setItem("watchlist", JSON.stringify(items))
            }
        }
    }
}

function modalSuccesHandler(data) {

    dialog.showModal()

    dialogContent.innerHTML = "";

    let imgDiv = document.createElement('div');
    imgDiv.id = "img-div";
    dialogContent.appendChild(imgDiv);

    let img = document.createElement("img")
    img.setAttribute("src",data.poster)
    img.setAttribute("alt","poster image")
    imgDiv.appendChild(img);

    let movieDiv = document.createElement('div');
    imgDiv.id = "movie-div";
    dialogContent.appendChild(movieDiv);

    let title = document.createElement('h2');
    title.innerText = data.title;
    movieDiv.appendChild(title);

    let genre = document.createElement('p');
    genre.innerText = data.genre;
    genre.id = "movie-genre"
    movieDiv.appendChild(genre);

    let release = document.createElement('p');
    release.innerText = `Released in ${data.release}`;
    release.id = "movie-release"
    movieDiv.appendChild(release);

    let description = document.createElement('p');
    description.innerText = data.description;
    movieDiv.appendChild(description);
}

// Local storage for favourites
function checkStorage(){
    if(stored){
        items = JSON.parse(stored)
    } else {
        items = []
        localStorage.setItem("watchlist", JSON.stringify(items))
    }
    for (let item of items) {
        const clickedItem = document.querySelector(`button[data-name = '${item}']`)

        console.log(clickedItem)

        clickedItem.classList.toggle('on-watchlist');
        if (clickedItem.innerText === "On Watchlist") {
            clickedItem.innerText = "Add to watchlist";
        } else {
            clickedItem.innerText = "On Watchlist";
            console.log(clickedItem)
        }
    }
}