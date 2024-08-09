var express = require('express');
var nodemailer = require('nodemailer');
require('dotenv').config();
var app = express();



var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,  // Use environment variable
        pass: process.env.GMAIL_PASS
    },
    debug: true
});


var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/send', function (req, res) {
    var mailOptions = {
        to: req.query.to,
        subject: 'Contact Form Message',
        from: `Contact Form Request <${req.query.from || 'default-email@gmail.com'}>`, // Fallback to a default email
        html: `From: ${req.query.name}<br>
               User's email: ${req.query.user}<br>
               Message: ${req.query.text}`
    };

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: "+response);
            res.end("sent");
        }
    });
});


app.listen(8080, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port on 8080");
    }
});
