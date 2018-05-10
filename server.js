require("./config.js")

const express = require("express")
var app = express()
var {mongoose} = require("./mongo");
var {Bank} = require("./bank")

var request = require("request");
var idGroup=[]
var bank;
var port = process.env.PORT;
app.get("/search/:id", (req, res)=>{
    var id = req.params.id
    idGroup.push({term:id, when:new Date().getHours()})
    var query =req.query
    request({url:`https://www.googleapis.com/customsearch/v1?key=AIzaSyCvqmHf2C_1Spngdel7a2CTo4nQMG-ZBtA&cx=010886161073826396288:p7k4yyiypdo&q=${id}&searchType=image&safe=high&num=${query.offset}`,
    json:true},
    (error, response, body)=>{
        if(error){
            return res.status(400).send(error.message)
        }
        var b =[]
        console.log(body.items.length);
        for (var i=0; i<body.items.length;i++){
            var a = {url:body.items[i].link, snippet:body.items[i].snippet, thumbnail:body.items[i].image.thumbnailLink, context:body.items[i].image.contextLink}
                b.push(a)

        }
        var d =new Date()
        var dt = {date:d.toLocaleDateString(), time:d.toLocaleTimeString()}
       
        bank = new Bank({
            term:id,
            when:dt})
            bank.save().then((doc)=>{
                console.log("saved to mongodb");
                
            }, (err)=>{
                console.log('could not send', err);
                
            });
        res.send((b))
    });
});
    
app.get("/latest", (req, res)=>{
Bank.find({}, {_id:0, __v:0}).then((doc)=>{
    res.send(doc)
},(err)=>{
    console.log('Could not retrieve documents');
});
});
app.listen(port);