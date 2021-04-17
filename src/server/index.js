var path = require('path')
const dotenv = require('dotenv');
const FormData = require('form-data')
const fetch = require('node-fetch')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.static('dist'))

app.use(express.json())

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/analyze', (req, res) => {
    var data = new FormData()
    data.append('url', req.body.url)
    data.append('key', process.env.API_KEY)
    data.append('lang', "auto")

    fetch("https://api.meaningcloud.com/sentiment-2.1", {
        method: 'post',
        body: data
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({error: "Something went wrong"})
        })
})
