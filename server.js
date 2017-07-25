var express = require('express');
var exphbs = require("express-handlebars");
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./models');
var app = express();
var port = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));
app.use(express.static(path.join(__dirname + '/views/public')));
app.use(require('./routes/loginSignUpRoutes.js'));
app.use(require('./routes/managerRoutes.js'));
app.use(require('./routes/serviceRoutes.js'));


db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });
});
