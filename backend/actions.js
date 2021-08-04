const fs = require("fs");
const path = require("path");

module.exports = {
    handleFormInput(input) {
        let cutOffPosition = input.indexOf("=")+1;
        const plusRegEx = /\+/g;
        let formInput = input.slice(cutOffPosition);
        let cleanFormInput= formInput.replace(plusRegEx, " ");
        return cleanFormInput
    },

//     serveFile(reqUrl) {

//         let filePath = "";

//         if(reqUrl == './') {
//             filePath = './index.html'
//         }

//         let extname = String(path.extname(filePath)).toLowerCase();
//         let mimeTypes = {
//             '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         '.json': 'application/json',
//         '.png': 'image/png',
//         '.jpg': 'image/jpg',
//         '.gif': 'image/gif',
//         '.svg': 'image/svg+xml',
//         '.wav': 'audio/wav',
//         '.mp4': 'video/mp4',
//         '.woff': 'application/font-woff',
//         '.ttf': 'application/font-ttf',
//         '.eot': 'application/vnd.ms-fontobject',
//         '.otf': 'application/font-otf',
//         '.wasm': 'application/wasm'
//         }

//         let contentType = mimeTypes[extname] || 'application/octet-stream';

//         fs.readFile(filePath, function(err, content) {
//             if(err) {

//             } else 
//         })
//     }
}