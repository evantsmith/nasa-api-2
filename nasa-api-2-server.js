var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/',function(req,res){
    res.sendFile('./public/html/nasa-api-2.html',{root: './'});
})

var startDate = '';
var endDate = '';


app.post('/search',function(req,res){

    startDate = req.body.start_date;
    endDate = req.body.end_date;
    // Send request from back-end using request module
    request({
        url:`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=vz1DB63uClneCNu9CrL96HK3uJGzqlsggBxx6g4u`
    }, function(error,response,body){

        //Error check
        if(error || response.statusCode !== 200){
            console.log("Failed to send request");
            res.send("Failed to send request");
        } else {
            // Turn body string into an object
            var bodyAsObj = JSON.parse(body);
            res.send(bodyAsObj);

        };

    }); // End request from request module

}) //  End app.post


app.listen(8080,function(){
    console.log("The app is listening on port 8080");

})

