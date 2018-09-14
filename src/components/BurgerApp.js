import React, {Component} from 'react';
import axios from 'axios';
import { Burgers } from './Burgers'
import { Modal, Button } from 'react-materialize'

export default class Burger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: []
    }
    this.addBurger = this.addBurger.bind(this)
    this.updateBurger = this.updateBurger.bind(this)
    this.deleteBurger = this.deleteBurger.bind(this)
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData() {
    axios.get('/api/burgers')
    .then((res) => {
      this.setState({apiData: res.data});
    })
    .catch((error) => {
      console.log(error);
    });
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
      $('#modal_0').modal('close');
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
    return (
      <div>
        <Modal
          trigger={<Button className="modal-btn btn-large">Create A Burger</Button>}
        >
          <form className="new-burger" onSubmit={this.addBurger}>
            <div class="input-field">
              <input type="text" name="burger" required/>
              <label for="burger">Burger Name</label>
            </div>
            <div class="input-field">
              <input type="text" name="topping1" required/>
              <label for="topping1">Topping #1</label>
            </div>
            <div class="input-field">
              <input type="text" name="topping2" required/>
              <label for="topping2">Topping #2</label>
            </div>
            <div class="input-field">
              <input type="text" name="topping3" required/>
              <label for="topping3">Topping #3</label>
            </div>
            <button className="waves-effect waves-light btn red lighten-2 burger-submit-btn" 
                    type="submit"
            >Create Burger</button>
          </form>
        </Modal>
        <Burgers burgers={this.state.apiData} 
                 updateBurger={this.updateBurger}
                 deleteBurger={this.deleteBurger}
        />
      </div>
    );
  }
}