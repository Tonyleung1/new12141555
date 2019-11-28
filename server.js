var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.listen(app.listen(process.env.PORT || 8099 ));

app.get('/login', function(req,res) {
    //let username = req.query.username;
    //console.log(req.body.username);
    //console.log(req.body.password);
    res.render('login');
});

//app.get('/login', function(req,res) { 
  //  authenticate(req.body.username, req.body.password, function(err, user){
        
//});



