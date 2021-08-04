// Node internal modules
const http = require('http'); //require Node's internal http package
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');

const actions = require('./actions');
const data = fs.readFileSync('./data.json');
let phrases = JSON.parse(data);
let lastId = phrases.length;
//console.log("Data", data);
//console.log(phrases);


const server = http.createServer((req, res) => {
    console.log("Running and listening on port 3000")

    // Parse URL for routing
    const parsedUrl = new URL(req.url, "http://localhost:3000");
    console.log("parsedUrl: ", parsedUrl);

    //////// Routing /////////
    
    function serveFile(filename) {
         return new Promise((resolve, reject) => {
             fs.readFile(filename, (err, data) => {
                 if (err)
                     reject(err);
                 else
                     resolve(data)
             });
         });
     };

    // Get logic for homepage
    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        // Show index.html file

        serveFile('../frontend/index.html').then(data => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    }

    if (parsedUrl.pathname === '/phrases' && req.method === 'GET') {
        // Show phrases.html file

        serveFile('../frontend/phrases.html').then(data => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        })
    }

    // GET logic for all phrases or queried by id
    if (parsedUrl.pathname === '/api/phrases' && req.method === 'GET') {
        if (parsedUrl.search === "") {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(phrases));
        } else {
            //console.log("params:", parsedUrl.searchParams.get("id"))
            let queryId = Number(parsedUrl.searchParams.get("id"));
            console.log(phrases)
            let filteredPhrases = phrases.filter(phrase => phrase.phraseId === queryId)
            console.log(filteredPhrases);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(filteredPhrases));
        }
    }

    // GET logic to show form to add a new phrase
    if (parsedUrl.pathname === '/new-phrase' && req.method === 'GET') {
        // Show form to add new phrases
        const newPhraseForm = fs.readFileSync('./phraseform.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(newPhraseForm);
    }

    // POST logic for new phrases
    if (parsedUrl.pathname === '/add-new-phrase' && req.method === 'POST') {
        req.on('data', data => {
            const formdata = data.toString();
            console.log("Incoming Data: ", formdata); //"name-of-form=word1+word2+word3"
            let newPhrase = actions.handleFormInput(formdata);
            console.log("New Phrase: ", newPhrase);

            if (newPhrase) {
                let newObj = { "phraseId": lastId + 1, "phrase": newPhrase };
                console.log("New Object: ", newObj);
                console.log("Pharses: ", phrases)
                phrases.push(newObj);
                let phrasesJson = JSON.stringify(phrases);

                fs.writeFile('./data.json', phrasesJson, (err) => {
                    console.log("I am running!")
                    //console.log("Phrases: ", phrases);
                    if (err) {
                        const message = { message: "Cannot add phrase" }
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(message));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(phrasesJson);
                    }
                })
            } else {
                const message = { message: "no new phrase in request" }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            }
        });
    }

    // if(parsedUrl.pathname === '/phrases' && req.method === 'PUT') {
    //     req.on("data", data => {
    //         const queryId = Number(parsedUrl.searchParams.get("id"));
    //     })
    // }

    // Delete request for phrases
    if (parsedUrl.pathname === '/phrases' && req.method === 'DELETE') {
        if (parsedUrl.search) {
            const queryId = Number(parsedUrl.searchParams.get("id"));
            phrases = phrases.filter(phrase => phrase.phraseId != queryId);

            fs.writeFile('.data.json', phrases, (err) => {
                if (err) {
                    const message = { message: 'could not find data!' };
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(message));
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(phrases));
                }
            })
        }
    }

    if (parsedUrl.pathname.includes(".")) {

        let filePath = parsedUrl.pathname;
        let fileExtension = filePath.slice(filePath.lastIndexOf(".")).toLowerCase();
        
        let mimeTypes = {
            '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
        }

        let contentType = mimeTypes[fileExtension] || 'application/octet-stream';

        serveFile(`../frontend${parsedUrl.pathname}`).then(data => {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        })
    }
}
); //function to create a server i.e. returns a new instance of http.Server

server.listen(3000); //Makes our server listen on port 3000

