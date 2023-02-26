const http = require('http');

const express = require('express');

const app = express();
const router = express.Router();

app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.sendFile('/public/html/index.html', {root : __dirname});
})

app.get('/error', (req, res, next) => {
    res.sendFile('404.html', {root : __dirname});
});

app.get('/manager_map', (req, res, next) => {
    res.sendFile('/public/html/map.html', {root : __dirname});
});


app.get('/user_map', (req, res, next) => {
    res.sendFile('/public/html/map.html', {root : __dirname});
});

app.listen(3000, () => {
    console.log("Server active on port http://localhost:3000");
});



var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=mongolian&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyCeDiSxzFywppo21vSsM_4F5yuPXSPTp0w',
  headers: { }
};

var res;
axios(config)
.then(function (response) {
  res = response;
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

module.exports = res;
