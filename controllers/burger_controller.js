module.exports = (app, db) => {
  app.get('/', (req, res) => {
    res.sendFile('index.html')
  })
  
  app.get('/api/burgers', (req, res) => {
    db.burger.findAll({ include: [db.topping] })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.log(err)
    })
  })

  app.post('/api/burgers/', (req, res) => {
    const newBurger = req.body
    db.burger.create({
      burger_name: newBurger.data.burger_name,
      toppings: [
        {topping_name: newBurger.data.toppings[0]},
        {topping_name: newBurger.data.toppings[1]},
        {topping_name: newBurger.data.toppings[2]}
      ],
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