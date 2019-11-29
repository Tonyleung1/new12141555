var http = require('http');
var express = require('express');
var app = module.exports = express();
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');


var url = 'mongodb+srv://Danny:qaz1234@comps381f-l6eyl.mongodb.net/test?retryWrites=true&w=majority';
var MongoClient = require('mongodb').MongoClient;
 


app.listen(app.listen(process.env.PORT || 8099 ));

app.get('/login', function(req,res) {
    //let username = req.query.username;
    //console.log(req.query.username);
    //console.log(req.body.password);
    res.render('login');
});

app.post('/login', function(req,res) { 
    const { username, password } = req.body;
    if (!username || !password ) {
        res.send( 'Please fill in all fields' );
    }else
        MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        //Write databse Insert/Update/Query code here..
        var db2 = db.db("pj381f");
        console.log('mongodb is running!');
        console.log("Switched to "+db2.databaseName+" database"); 
        var user = { name: req.body.username , password: req.body.password  }; 
            db2.collection("user").findOne(user,function(err, result) {
            if (result != null) {
                console.log(result);
                res.render('index');  
            }
            else{
                res.send('wrong ac');
            // close the connection to db when you are done with it
            db.close(); }
            }); 
            //res.render('index');   
            
       });  
      
});
app.get('/register', (req, res) => {
    res.render('register');
   });
app.post('/register', function(req,res) { 
    const { username, password } = req.body;
    if (!username || !password ) {
        res.send( 'Please fill in all fields' );
    }else
        MongoClient.connect(url, function (err, db) {
        if(err) throw err;
        //Write databse Insert/Update/Query code here..
        var db2 = db.db("pj381f");
        console.log('mongodb is running!');
        console.log("Switched to "+db2.databaseName+" database"); 
        var user = { name: req.body.username , password: req.body.password  }; 
            db2.collection("user").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("user registered");
            // close the connection to db when you are done with it
            db.close();
            }); 
            
            res.send('user registered');
       });   
});
app.get('/Create', (req, res) => {
    res.render('Create');
   });

app.post('/Create', function(req,res) { 
 /*   var server = http.createServer(function(req, res){
        MongoClient.connect(mongodbURL,{useMongoClient: true,});
        db = MongoClient.connection;
        db.on('error',() => {
            console.error.bind(console, 'connection error:');
            res.writeHead(500,{"Content-Type":"text/plain"});
            res.end('MongoDB connection error!');				
        });
        db.once('open', () => {
            var restaurant = MongoClient.model('Schema', Schema);
            var new_k = {};
            new_k['name'] = req.body.name;
            new_k['owner'] = req.body.owner;
            var fluffy = new restaurant(new_k);
            // consider calling fluffy.validate() before save()
            fluffy.save(function(err) {
                //if (err) throw err
                if (err) {
                    console.log('save() error ' + err.name);
                    res.writeHead(500,{"Content-Type":"text/plain"});
                    res.end(JSON.stringify(err.name));
                } else {
                    console.log('restaurant created!')
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end("Created: " + JSON.stringify(new_k));
                }
                db.close();
            });
        });

    });
    */
 
   // Connect to the db
   MongoClient.connect(url, function (err, db) {
     if(err) throw err;
     //Write databse Insert/Update/Query code here..
     var db2 = db.db("pj381f");
     console.log('mongodb is running!');
     console.log("Switched to "+db2.databaseName+" database"); 
     var doc = { name: req.body.name , owner: req.body.owner  }; 
     db2.collection("restaurant").insertOne(doc, function(err, res) {
        if (err) throw err;
        console.log("Document inserted");
        // close the connection to db when you are done with it
        db.close();
    }); 


    });


});

//app.get('/login', function(req,res) { 
  //  authenticate(req.body.username, req.body.password, function(err, user){
        
//});

//git add .
//git commit -m '版本訊息'
//git push heroku master

// 