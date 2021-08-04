// DOM elements
const phrasesList = document.getElementById("phrases-list");

// Request data from backend on /api/phrases

fetch('http://localhost:3000/api/phrases')
    .then(resp => resp.json())
    .then(phrasesData => {
        //console.log("fetch data: ", phrasesData)

        phrasesData.forEach(element => {
            const listElement = document.createElement("li");
            listElement.innerHTML = element.phrase;
            console.log(listElement);
            phrasesList.appendChild(listElement);
        });


    });
