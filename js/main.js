window.addEventListener('load', init);

let urls = []
let names = []
let id = []
let Description
let tabUrl
const Webservice = "http://localhost/CLE3/webservice/"
let button

function init(){
    Description =  document.getElementById("buttonDescription");
    button = document.getElementById("buttonLocation")
    ajaxRequest(Webservice)
}


function checktab(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        tabUrl = tabs[0].url;
        checkIfExists()
    });
}


function goToPage(){
    for (let i = 0; i < id.length; i++) {
        let contains = names[i];
        let included = tabUrl.includes(contains)
        if(included){
            console.log(urls[i])
            chrome.tabs.create({
                url: `${urls[i]}`
            });
        }
    }
}


function SuccesHandeler(data){
    for(const result of data){
        console.log(result.id)
        console.log(result.name)
        console.log(result.url)
        urls.push(result.url)
        names.push(result.name)
        id.push(result.id)
    }
    checktab()
}

function checkIfExists(){
    Description.innerHTML = "Er is geen toegankenlijkheids pagina gevonden voor deze website"
    for(let i = 0; i < id.length; i++) {
        let contains = names[i];
        let included = tabUrl.includes(contains)
        if(included === true){
            Description.innerHTML = "Voor deze website is een toegankenlijkheids pagina gevonden!" +
                " Klik op de knop om verder te gaan";

            console.log("gelukt")

            const buttonToPage = document.createElement('button');
            buttonToPage.id = "buttonToPage"
            buttonToPage.innerHTML = "Ga naar pagina";
            buttonToPage.addEventListener('click', goToPage);

            button.appendChild(buttonToPage);
        }
    }
}

function ajaxRequest(url){
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(SuccesHandeler)
        .catch(ErrorHandeler);
}


function ErrorHandeler(data) {
    console.error(data);
}
