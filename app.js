const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");
const app = express();
app.use(express.static("public"));       //we have done this so as to use static things of our website i.e things which are local such as styles.css and image.png
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {
    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;
    const data = {
     members:[
        {
           email_address:email,
            status:"subscribed",
            merge_fields:{
                "FNAME":firstname,
                // FNAME:req.body.fname,
                "LNAME":lastname,
            }
        }
     ]
    };
    const JsonData=JSON.stringify(data);
    // const url="https://$API_SERVER.api.mailchimp.com/3.0/lists/daca5bdf21" ;
    const url="https://us21.api.mailchimp.com/3.0/lists/daca5bdf21" ;
    const options={
        method:"POST",
        auth:"abdulmuqsit:818869367e0b7f4a7c10f8e841b86d0b-us21"
    }
   const request= https.request(url,options,function(response){
     if(response.statusCode===200)
     {
        res.sendFile(__dirname+"/success.html");
     }
     else{
        res.sendFile(__dirname+"/failure.html");
     }
       response.on("data",function(data){
    console.log(JSON.parse(data));
       });
    });
    request.write(JsonData);
    request.end();
});
// {
//     "name": "$event_name",
//     "contact": $footer_contact_info,
//     "permission_reminder": "permission_reminder",
//     "email_type_option": true,
//     "campaign_defaults": $campaign_defaults
//   }
app.post("/failure",function(req,res){
res.redirect("/");            //redirecting it to home path
});
app.listen(process.env.PORT||3000, function () {
    console.log("Server is running on port 3000!");
});
//API KEY from MailChimp
// 818869367e0b7f4a7c10f8e841b86d0b-us21
//Lists
// daca5bdf21