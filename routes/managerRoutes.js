var express = require('express');
var methodOverride = require('method-override');
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
var router = express.Router();
router.use(methodOverride("_method"));
var db = require('./../models');

// Renders the Page for the Current user
router.get('/user/:username', function(req, res){
	// finds the user in the database
	db.User.findOne({
		where: {
			username: req.params.username
		} 
	}).then(function(data){
		// finds all the products will the current user's Id
		var currentUserId = data.dataValues.id;
		db.Product.findAll({
			where: {
				UserId: currentUserId
			}
		}).then(function(data){
			// goes inside the data and inserts the current username
			// this is used later when the page is rendered
			for(var i = 0; i < data.length; i++){
				data[i].currentUser = req.params.username;
			}
			// renders the manage page which contains the products table
			res.render('manage', {
				products: data,
				currentUser: req.params.username
			});
		});
	});
});

// Route for creating a new product under the current user
router.post('/user/:username' , function(req, res){
	// finds the current user in the database
	db.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function(data){
		// stores the userId 
		var userId = data.dataValues.id;
		// creates the product with the input values
		// the user provided
		db.Product.create({
			name: req.body.productName,
			quantity: req.body.quantity,
			price: req.body.price,
			UserId: userId
		}).then(function(data){
			// redirects to manage page
			res.redirect('/user/' + req.params.username);
		});
	});	
});

// Route for adding more stock to a specific product
router.put('/user/:username/product/:productName', function(req, res){
	// adds up the new total amount
	var newTotalAmount = parseInt(req.body.amountToAdd) + parseInt(req.body.currentAmount);
	// updates the product with the new total amount
	db.Product.update({
		quantity: newTotalAmount 
	},
	{
		where: {
			UserId: req.body.userIdToAdd,
			name: req.body.productToAdd
		}
	}).then(function(data){
		// redirects to the manage page
		res.redirect('/user/' + req.params.username);
	});
});

// Route for removing a specific product from the database
router.delete('/user/:username/remove/:id', function(req, res){
	// stores id of product
	var id = req.params.id;
	var username = req.params.username;
	// removes the product through the id
	db.Product.destroy({
		where: {
			id: id
		}
	}).then(function(data){
		// redirects to manage page
		res.end();
	});
});

module.exports = router;
