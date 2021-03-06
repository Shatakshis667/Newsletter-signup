const express= require("express");
const bodyParser= require("body-parser");
const request=require("request");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});



app.post("/", function(req, res){
 var firstname= req.body.fname;
 var lastname= req.body.lname;
 var email= req.body.email;
 console.log(firstname, lastname, email);

 var data={
     members: [
         {
             email_address: email,
             status: "subscribed",
             merge_fields: {
                 FNAME: firstname,
                 LNAME: lastname
             }
         }
     ]
 };

 var jsondata= JSON.stringify(data);


 var options={
    url: "https://us4.api.mailchimp.com/3.0/lists/5d6090dcd0",
    method: "POST",
    headers:{
        "Authorization": "shatakshis667 5cf885bc78fc3f55606e9c349584b0b2-us4"
    },
    body: jsondata
};

request(options, function(error, response, body){
  if(error)
  {res.sendFile(__dirname+"/failure.html"); }
  else
  {if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html");
    }
    else
{
    res.sendFile(__dirname+"/failure.html");
}}
});

});


app.post("/failure", function(req, res){
    res.redirect("/");
});
var options={
    url: "https://us4.api.mailchimp.com/3.0/lists/5d6090dcd0",
    method: "POST",
}

request(options, function(error, response, body){

});

app.listen(3000, function()
{
    console.log("server started at 3000");
}); 



//api key
// 5cf885bc78fc3f55606e9c349584b0b2-us4


//list id
//5d6090dcd0