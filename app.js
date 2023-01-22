const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile(__dirname +"/html/signup.html");
});

app.post("/", function(req, res){
    // console.log("StatusCode:", res.statusCode);
    
    const fristName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fristName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/6971aa0a70";

    const options = {
        method: 'POST',
        auth: "rezaulkarim:486fb1b0fc6d231737018c6ec934008f-us11"
    };
    
   const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
        res.sendFile(__dirname +"/html/success.html");
    }else {
        res.sendFile(__dirname +"/html/failure.html");
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log(`The server running on port ${PORT}!`);
});
