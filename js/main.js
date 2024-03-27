//  uitzoeken plugin showen.
//  documentatie zoeken hoe je html code van site onder popup mag aanroepen.
//  hoe ga je toegankenlijkheid vinden op de site, zoek functie
// onderzoek naar toegankenlijkheid paginas


window.addEventListener('load', init);


function init(){

}



function ajaxRequest(url, succesHandeler){
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(succesHandeler)
        .catch(ErrorHandeler);
}




function ErrorHandeler(data){
console.error(data);
}