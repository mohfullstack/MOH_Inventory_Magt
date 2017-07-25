var express = require('express');
var methodOverride = require('method-override');
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
var router = express.Router();
router.use(methodOverride("_method"));
var db = require('./../models');

// renders login page
router.get('/', function(req, res){
	res.render('login');
});
// Login authentication route
router.post('/', function(req, res){

	// Goes inside database and looks for the user
	db.User.findOne({
		where: {
			username: req.body.userName
		}
	}).then(function(data){
		// Stores username and password values
		var userName = data.dataValues.username;
		var password = data.dataValues.password;
		// if the password the user provided
		// matches the password inside the database
		if(password === req.body.password){
			// then redirect the user to their account
			res.send(userName);
		}
		else{
			// else, tell the user the username/password is invalid
			res.send('Invalid username or password.');
		}
	});
});

// Renders the signUp page
router.get('/signUp', function(req, res){
	res.render('signUp');
});

// Route for Creating a new account
router.post('/signUp', function(req, res){
	// Stores input values
	var name = req.body.name;
	var username = req.body.userNameSign;
	var password = req.body.passwordSign;
	var passwordConfirm = req.body.passwordConfirm;
	db.User.findOne({
		where: {
			username: username
		}
	}).then(function(data){
		if(data){
			res.send('Username taken, choose a different one.')
		}
		else{
			// checks if the password match
			if(passwordConfirm !== password){
				res.send('Passwords do not match.');
			}
			// if passwords match and username isnt taken
			else if(passwordConfirm === password){
			// Create the user in the database
			db.User.create({
				name: name,
				username: username,
				password: password
			}).then(function(data){
				res.end();
			});
		}
	}
});
	
});	

module.exports = router;
