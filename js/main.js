window.addEventListener('load', init);


function init() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tabUrl = tabs[0].url;
        console.log(tabUrl);
    });
}




function SuccesHandeler(){

}

function ajaxRequest(url,){
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