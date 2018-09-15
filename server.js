const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require("express-session")
const passport = require("./config/passport");
const app = express();
const port = process.env.PORT || 8080;
const db = require('./models');

//passport
app.use(session({ secret: "guitar hero", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

//serve static files
app.use(express.static(path.join(__dirname, './public')))

//configure bodyParser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//require routes
const routes = require('./controllers/burger_controller')(app, db, path)

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("server is running at " + port);
  });
});