// Express server. Back-end data-relaying, mild security and serving the SPA.

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const TOKEN_API = "";
const FIND_API = "";

const app = express();
const port = process.env.PORT || 9000;

// Async function to get result from provided link, with selected Options as Body.
const getResult = async (requestBody) => {
    var requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: requestBody
    }
    var response = await fetch(FIND_API, requestOptions);
    var result = await response.json();
    
    return result;
}

// Async function get token from provided link.
const getToken = async () => {
    var requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json' }
    }
    var response = await fetch(TOKEN_API, requestOptions);
    var tokenObject = await response.json();

    return tokenObject.token;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

// Hosted by this server to process received UI input, getToken; send them to getResult.
app.route('/api/getResult')
    .post(async (req, res) => {
        var token = await getToken();

        var attemptObject = {}; // e.g. {token: 'ladida', planetnames:[], vehiclenames:[]}
        attemptObject['token'] = token;
        attemptObject['planet_names'] = req.body['planet_names'];
        attemptObject['vehicle_names'] = req.body['vehicle_names'];

        var result = await getResult(JSON.stringify(attemptObject));

        res.send(result)
    });

if(process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/build')));

    // Will need to look further with react-router
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '/build', 'index.html'));
    })
}

app.get('/', (req, res) => {
    res.render('./index.html');
});

app.listen(port, () => console.log(`Listening on port ${port}`));