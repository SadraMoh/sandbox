const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

const path = require('path');

const fs = require('fs');
const http = require('http');
const https = require('https');

// var privateKey = fs.readFileSync('selfsigned.key', 'utf8');
// var certificate = fs.readFileSync('selfsigned.crt', 'utf8');

// var credentials = { key: privateKey, cert: certificate };

// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// ---

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// static folders
app.use('/', express.static(path.join(__dirname, '/public')))

// default page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'index.html'));
})

// test post endpoint
app.post('/send', (req, res) => {
  console.log('[request]', req.body);
  res.json(req.body)
})

const port = 8080
app.listen(port, (e) => {
  console.log('Server started at http://localhost:' + port)
})

// ---

// httpServer.listen(8080, (hostname) => {
//   console.log('Server started at http://localhost:' + 8080)
// });

// httpsServer.listen(8443, (hostname) => {
//   console.log('Server started at https://localhost:' + 8443)
// });