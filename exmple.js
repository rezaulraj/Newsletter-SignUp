const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile(__dirname +"/html/signup.html");
})
app.post("/", (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    
    const data = {
        mambers: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }

        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us11.api.mailchimp.com/3.0/lists/6971aa0a70";

    const options = {
        method: 'POST',
        auth: "rezaul123:486fb1b0fc6d231737018c6ec934008f-us11"
    };

    const request = https.request(url, options, (response)=>{
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.listen(port, function (){
    console.log(`Server is running on port ${port}!`)
});

// list id: 6971aa0a70
// api key : 486fb1b0fc6d231737018c6ec934008f-us11