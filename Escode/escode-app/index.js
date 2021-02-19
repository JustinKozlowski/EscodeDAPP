var express = require('express');
var app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
const codeUpload = multer({dest: './uploads'});
const cors = require('cors');
var corsOptions = {
    origin: '*',
    credentials: true };

app.use(cors(corsOptions));

app.use(express.static('src'));
app.use(express.static('../blindauction-contract/build/contracts'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var jobs = {

}

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/jobs', function (req, res) {
    res.json(JSON.stringify(jobs));
});

app.post('/create-job', function(req,res){
    var jobAddress = req.body.address;
    jobs[jobAddress] = {
        address: jobAddress,
        payment: req.body.payment,
        description: req.body.description,
        verifier: req.body.verifier,
    }
    res.redirect('back');
});

// Handle code submission
app.post('/submission-code', codeUpload.single('code'), function(req,res){
    var filename = '';
    if(!req.file){
        console.log('No file submitted')
    }
    else {
        filename = req.file.filename;
    }
    var address = req.query.address;
    jobs[address].code = filename;
    res.redirect('back');
});

app.get('/deleteJob', codeUpload.single('code'), function(req,res){
    delete jobs[req.query.address];
    res.send('back');
});

app.get('/removeJob', codeUpload.single('code'), function(req,res){
    delete jobs[req.query.address];
    res.send('back');
});

app.get('/Escode.json', codeUpload.single('code'), function(req,res){
    res.sendFile(__dirname +'/src/js/Escode.json');
});

app.listen(3000, function () {
  console.log('Auction Dapp listening on port 3000!');
});