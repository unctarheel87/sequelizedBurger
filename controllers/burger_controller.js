const passport = require("../config/passport");
const isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = (app, db, path) => {
  app.get('/', (req, res) => {
    res.sendFile('index.html')
  })

  app.get('/api/burgers', isAuthenticated, (req, res) => {
    db.burger.findAll({ 
      where: {
        userId: req.user.id
      },
      include: [db.topping] })
    .then(response => {
      res.json({ data: response, isLoggedIn: true })
    })
    .catch(err => {
      console.log(err)
    })
  })

  //authenticate POST route
  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    console.log(req.user.id)
    console.log(req.session)
    res.json(true);
  });

  //create user
  app.post('/api/users', (req, res) => {
    const newUser = req.body.data
    db.user.create({
      username: newUser.username,
      password: newUser.password
    })
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })

  //logout
  app.get("/api/logout", function(req, res) {
    console.log(req.user)
    req.logout();
    console.log(req.session)
    res.json(false)
  });

  app.post('/api/burgers/', (req, res) => {
    const newBurger = req.body
    db.burger.create({
      burger_name: newBurger.data.burger_name,
      toppings: [
        {topping_name: newBurger.data.toppings[0]},
        {topping_name: newBurger.data.toppings[1]},
        {topping_name: newBurger.data.toppings[2]}
      ],
      userId: req.user.id
    }, {
      include:[ db.topping ]
    })
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })

  app.put('/api/burgers/:id', (req, res) => {
    db.burger.update({
      devoured: true
    }, { 
      where: { id: req.params.id }
    })
    .then((response) => {
      if(response.changedRows === 0) {
        return res.status(404).end()
      } else {
        res.status(200).end()
      }
    })
    .catch((err) => {
      res.status(500).end()
    })
  })

  app.delete('/api/burgers/:id', (req, res) => {
    db.burger.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((response) => {
      if(response.changedRows === 0) {
        return res.status(404).end()
      } else {
        res.status(200).end()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })
}