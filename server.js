'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const random = require('randomstring');
const path = require('path');
const fs = require('fs');

const server = express();

server.use(bodyParser.raw({
    inflate: false,
    limit: 26214400,
    type: 'application/pdf',
    verify: false 
}));
server.use(bodyParser.json());

server.timeout = 1200000;

server.post('/upload', function (req, res) {
    var fileLoc = path.join('./uploads', random.generate({ length: 10, charset:'alphabetic'}) + '.pdf');
    var wstream = fs.createWriteStream(fileLoc);

    req.on('data', function(chunk) { 
        console.log(chunk.length);
        wstream.write(chunk);   // Not the best way to handle thsi call... 
    });

    req.on('end', function() {
        wstream.end();  // Not the best way to handle thsi call... 
        res.status(200).send('Done');
    });
});

// start the server
server.listen('8080', ()=>{
    console.log('listening on port 8081');
});

module.exports = server;
