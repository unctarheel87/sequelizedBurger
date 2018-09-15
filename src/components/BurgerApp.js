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
      this.setState({apiData: res.data.data, isLoggedIn: res.data.isLoggedIn});
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
      $('#modal_0').modal('close');
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
      $('#modal_1').modal('close');
      this.getApiData()
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
      $('#modal_2').modal('close');
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
      return <Login addUser={this.addUser} loginUser={this.loginUser}/>
    } else if(this.state.isLoggedIn == true) {
      return (
        <div>
          <Navbar logOut={this.logOut} />
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