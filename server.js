var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var mongojs = require('mongojs');

var url = 'mongodb://localhost:27017/amex_file_reprocessing';

app.use(express.static(__dirname + '/web'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/img', express.static(__dirname + '/img'));

app.use(bodyParser.json());

var db;

// Initialize connection once
MongoClient.connect(url, function (err, database) {
    if (err) {
        throw err;
    }
    db = database;
});

app.post('/add_new_user', function (req, res) {
    var user = {
        name: req.body.username.$viewValue,
        email: req.body.email.$viewValue,
        password: req.body.password.$viewValue,
    }
    db.collection('user').insertOne(user, function (err, docs) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Success");
        }
    });
});

app.post('/delete_existing_user/:email', function (req, res) {
    var email = req.params.email;
    //var email= "mm@gmail.com";
    db.collection('user').remove({ "email": email }, function (err, docs) {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Success");
        }
    });
});

app.get('/get_all_users', function (req, res) {
    db.collection('user').find(function (err, docs) {
        docs.toArray(function (err, result) {
            res.json(result);
        });
    });
});

app.get('/find_user_by_email/:email', function (req, res) {
    var email = req.params.email;
    db.collection('user').find({ "email": email }, function (err, docs) {
        docs.toArray(function (err, result) {
            res.json(result);
        });
    });
});

app.get('/test_read', function (req, res) {
    fs = require('fs')
    fs.readFile('text.xml', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.send(data);
    });
});


app.listen(3000);
console.log('server running on port 3000');