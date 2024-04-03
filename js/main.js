window.addEventListener('load', init);

let urls = []
let names = []
let id = []


const Webservice = "http://localhost/CLE3/webservice/"

function init(){
    checktab()
    ajaxRequest(Webservice)
}


function checktab(){
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        let tabUrl = tabs[0].url;
        console.log(tabUrl);
    });
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
    console.log(id)
    console.log(names)
    console.log(urls)
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


function ErrorHandeler(data){
console.error(data);
}