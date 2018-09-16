import React, {Component} from 'react';
import axios from 'axios';
import { Burgers } from './Burgers'
import Login from './Login'
import CreateBurger from './CreateBurger'
import Navbar from './Navbar'

export default class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      user: '',
      isLoggedIn: false
    }
    this.addBurger = this.addBurger.bind(this)
    this.updateBurger = this.updateBurger.bind(this)
    this.deleteBurger = this.deleteBurger.bind(this)
    this.addUser = this.addUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData() {
    axios.get('/api/burgers')
    .then((res) => {
      this.setState({
        apiData: res.data.data,
        user: res.data.user,
        isLoggedIn: res.data.isLoggedIn
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  addUser(e) {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    axios.post('/api/users', { data: {username, password} })
    .then((res) => {
      console.log(res)
      $('.open').modal('close');
      this.getApiData()
    })
    
  }

  loginUser(e) {
    e.preventDefault()
    const username = e.target.elements.username.value
    const password = e.target.elements.password.value
    axios.post('/api/login', {username, password} )
    .then((res) => {
      console.log(res)
      $('.open').modal('close');
      this.getApiData()
    })
    .catch(err => {
      this.setState({message: 'Incorrect username or password!'})
    })
  }

  logOut(e) {
    e.preventDefault()
    axios.get('/api/logout')
    .then((res) => {
      this.setState({isLoggedIn: res.data})
    })
  }

  addBurger(e) {
    e.preventDefault()
    const burger_name = e.target.elements.burger.value
    const toppings = [
      e.target.elements.topping1.value,
      e.target.elements.topping2.value,
      e.target.elements.topping3.value
    ]
    console.log(burger_name, toppings)
    axios.post('/api/burgers', { data: {burger_name, toppings} })
    .then((res) => {
      console.log(res)
      $('.open').modal('close');
      this.getApiData()
    })
  }

  updateBurger(e, burger_id) {
    e.preventDefault()
    axios.put(`/api/burgers/${burger_id}`)
    .then((res) => {
      console.log(res)
      this.getApiData()
    })
  }

  deleteBurger(e, burger_id) {
    e.preventDefault()
    axios.delete(`/api/burgers/${burger_id}`)
    .then((res) => {
      console.log(res)
      this.getApiData()
    })
  }

  render() {
    if(!this.state.isLoggedIn) {
      return (
        <div>
          <Navbar />
          <h1 className="header">The Burger Shack</h1>
          <Login addUser={this.addUser} loginUser={this.loginUser} msg={this.state.message}/>
        </div>
      )
    } else if(this.state.isLoggedIn == true) {
      return (
        <div>
          <Navbar logOut={this.logOut} user={this.state.user} />
          <h1 className="header">Welcome {this.state.user}!</h1>
          <CreateBurger addBurger={this.addBurger} />
          <Burgers burgers={this.state.apiData} 
                  updateBurger={this.updateBurger}
                  deleteBurger={this.deleteBurger}
          />
        </div>
      );
    }
  }
}