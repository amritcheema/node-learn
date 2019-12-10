/* defining variables */
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./routes/database');
var gulp = require('./gulpfile');

/* intializing express */
var app = express();

var products = require('./routes/products');
app.use('/products', products);

/* Telling express about the packages we are going to use */
app.use(session({
    secret:"mysecret",
    resave: true,
    saveUninitialized:true
}));

//bodyparser will extract the form data from html file
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/* telling express to use images folder */
app.use('*/images', express.static(__dirname + '/public/images'));
app.use('*/css', express.static(__dirname + '/public/css'));
app.use('*/css', express.static(__dirname + '/css'));
/* display our home.html */
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/views/home.html'));
});
/* display our login.html */
app.get('/login', function(req,res){
    res.sendFile(path.join(__dirname + '/views/login.html'));
});
/* display our dashboard.html */
app.get('/dashboard', function(req,res){
    res.sendFile(path.join(__dirname + '/views/dashboard.html'));
});

/* handling form post request from login form means checking user details in DB */
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) {
            console.log('DB db error or cant insert into accounts');
            } else if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = username;
                console.log(username);
				response.redirect('/dashboard');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/product', function(request,response) {
    var productname = request.body.productname;
    var price = request.body.price;
    var qty = request.body.quantity;
    
    if(productname && price && qty) {
        db.query("INSERT INTO products (Product_name ,Price ,Quantity) VALUES ('"+ productname +"','"+ price +"','"+ qty +"')", function(error, results) {
        if (error) throw error;
            if (results.affectedRows > 0) {
				response.send("Product details added:" + productname, price, qty);
			} else {
                console.log(results);
				response.send('cant insert record into product table');
			}			
			response.end();
		});
    } else {
        response.send('Please complete product details!!');
    }
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

/* listeing to server at 3000 */
app.listen(3000,() =>{
    console.log("Yippeee!! Server 3000 is running....");
});