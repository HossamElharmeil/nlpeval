var path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const unirest = require('unirest')

dotenv.config();

const app = express()
const PORT = process.env.PORT || 8081

app.use(express.static('dist'))

app.use(express.json())

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
        return res.json({})
    }
    next()
})

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/analyse', (req, res) => {
    console.log(req.body)

    unirest.post("https://api.meaningcloud.com/sentiment-2.1")
        .headers({ 'Content-Type': 'multipart/form-data' })
        .field('url', req.body.url)
        .field('key', process.env.API_KEY)
        .field('lang', 'auto')

        .then(result => {
            console.log(result.status)
            res.json(result.body)
        })
        .catch(error => {
            console.error(error);
            
            res.status(500).json({error: "Something went wrong"})
        })
})
