var express = require('express');
var http = require('http');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();
var server = http.Server(app);
var port = 500;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "/contact.html")));

app.get("/", function(req, response) {
  response.sendFile(path.join(__dirname, "/contact.html))
})

app.post("/send_email", function(req, response){
  var from = req.body.from
  var to = req.body.to
  var subject = req.body.subject
  var message = req.body.message

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'weeebonics@gmail.com',
      pass: 'rznmmnwwwqtradpq'
    }
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    message: message
  }

  transporter.sendMail(mailOptions,function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
    
    response.redirect("/index.html")
    
  }

})
  
server.listen(port, function(){
  console.log("Starting Server on port: " + port)
})
