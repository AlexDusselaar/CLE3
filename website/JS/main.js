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
    getData(apiUrl, logData);
}

function getData(url, succesFunction){
    fetch(url)
        .then((response) => {
            if(!response.ok){
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(succesFunction)
        .catch(errorHandler);
}

function logData(data) {
    for (let result of data){

        let li = document.createElement("li")
        ul.append(li)

        let p = document.createElement("p")
        p.innerText = result.name
        li.append(p)

        let pagesDiv = document.createElement("div")
        li.append(pagesDiv)

        let pageButton = document.createElement("button")
        pageButton.textContent = "Bezoek pagina"
        pageButton.id = result.id
        pageButton.classList.add("pagina-button")
        pagesDiv.append(pageButton)

        let favouriteButton = document.createElement("button")
        favouriteButton.classList.add("favorieten-button")
        favouriteButton.dataset.name = result.id
        favouriteButton.textContent = "Toegevoegen aan favorieten"
        pagesDiv.append(favouriteButton)

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
        if (event.target.className === "pagina-button") {
            let movie = movieData[event.target.id];

            let movieUrl = "../webservice/index.php?id=" + movie.id

            getData(movieUrl, modalSuccesHandler);

            // watchlist
        } else if (event.target.className !== "pagina-button") {
            let clickedItem = event.target;
                clickedItem.classList.toggle('on-watchlist');
                if (clickedItem.innerText === "Verwijder uit favorieten") {
                    clickedItem.innerText = "Toevoegen aan favorieten";
                    let itemIndex = items.indexOf(clickedItem.dataset.name)
                    items.splice(itemIndex, 1)
                    localStorage.setItem("watchlist", JSON.stringify(items))
                } else {
                clickedItem.innerText = "Verwijder uit favorieten";
                items.push(clickedItem.dataset.name)
                    localStorage.setItem("watchlist", JSON.stringify(items))
            }
        }
    }
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

        clickedItem.classList.toggle('favoriet');
        if (clickedItem.innerText === "Toegevoegen aan favorieten") {
            clickedItem.innerText = "Verwijder uit favorieten";
        } else {
            clickedItem.innerText = "Toegevoegen aan favorieten";
            console.log(clickedItem)
        }
    }
}