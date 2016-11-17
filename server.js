var express = require('express');
var port = process.env.PORT || 3000;

var axios = require('axios');

var app = express();

var root = __dirname + '/public'
app.use(express.static(root));

app.get('/', function(req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/api/account/valid', function(req, res) {
    var coaCode = req.query.chartOfAccountsCode;
    var accountNumber = req.query.accountNumber;
    axios.get('https://dragons-tst.kuali.co/fin/coa/api/v1/reference/acct?chartOfAccountsCode=' + coaCode + "&accountNumber=" + accountNumber, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MmI3OWVjOWFhYjg2MDAwMTYxZTQ4MyIsImlzcyI6Imt1YWxpLmNvIiwiZXhwIjoxNTEwNzgwMjY4LCJpYXQiOjE0NzkyNDQyNjh9.7qQTsOR8_CL8-sFmawEjHfYB1GeaFHVibdNTo629XH0'
        }
    })
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send('failed');
    });
});
app.get('/api/account/autocomplete', function(req, res) {
    var accountName = req.query.accountName + '*';
    axios.get('https://dragons-tst.kuali.co/fin/coa/api/v1/reference/acct?accountName=' + accountName, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4MmI3OWVjOWFhYjg2MDAwMTYxZTQ4MyIsImlzcyI6Imt1YWxpLmNvIiwiZXhwIjoxNTEwNzgwMjY4LCJpYXQiOjE0NzkyNDQyNjh9.7qQTsOR8_CL8-sFmawEjHfYB1GeaFHVibdNTo629XH0'
        }
    })
    .then(function (response) {
        res.send(response.data.results.map(account => account.accountName));
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send('failed');
    });
});

app.listen(port);
console.log('Started server on port ' + port);
