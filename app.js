const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    reply(reply_token, msg)
    res.sendStatus(200)
})

function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {CAJK8jG6qWU/BlKoE4RUyYZAa8q0muS53Wp/mDFoOhLv0NwCzx/drlk4Fi8Ltcs+wRHlGayfH2l/bm1ljezXfzwO2dN4vXE6whC7kSnHktJlM2k2m9Plzydp2Qg9ksGloO1bYehEq4wVoCavQ4CJtwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}

app.listen(port, () => {
    console.log(`msging-api\'server is running on localhost:${port}`)
})