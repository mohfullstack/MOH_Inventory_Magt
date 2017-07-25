var express = require('express');
var methodOverride = require('method-override');
var helpers = require('handlebars-helpers');
var comparison = helpers.comparison();
var router = express.Router();
router.use(methodOverride("_method"));
var db = require('./../models');

//Route for displaying service section
router.get('/user/:username/service', function(req, res){
	// finds the current user in the database
	db.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function(data){
		// stores userId
		var currentUserId = data.dataValues.id
		// finds all the products of the current user
		db.Product.findAll({
			where: {
				UserId: currentUserId
			}
		}).then(function(data){
			// displays products for sale
			res.render('service', {
				products: data,
				currentUser: req.params.username
			});
		});
	});
});

// Route for buying a product
router.post('/user/:username/service', function(req, res){
	// finds the current user in the database
	db.User.findOne({
		where: {
			username: req.params.username
		}
	}).then(function(data){
		// stores userId and checkout cart
		var UserId = data.dataValues.id;
		var results = req.body.checkoutCart;
		// Goes inside every product being bought
		// and updates the stock quantity
		for(var i = 0; i < results.length; i++){
			// stores current amount and amount to add
			var currentAmount = parseInt(results[i].currentAmount);
			var amount = parseInt(results[i].amount);
			// subtracts both to have the new amount
			var newAmount = currentAmount - amount;
			// updates the database with the new amount
			db.Product.update({
				quantity: newAmount
			},
			{
				where: {
					name: results[i].product,
					UserId: UserId
				}
			}).then(function(data){
			});
		}
		res.end();
	});
});

module.exports = router;