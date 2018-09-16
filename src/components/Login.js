import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-materialize'

export default (props) => {
  return (
    <div>
      <Modal 
        trigger={<Button className="modal-btn btn-large">Sign Up</Button>}
      >
        <form className="sign-up" onSubmit={props.addUser}>
          <div className="input-field">
            <input type="text" name="username" required/>
            <label for="burger">username</label>
          </div>
          <div className="input-field">
            <input type="text" name="password" required/>
            <label for="topping1">password</label>
          </div>
          <button className="waves-effect waves-light btn red lighten-2" 
                  type="submit"
          >Sign-Up</button>
        </form>
      </Modal>

      <Modal
        trigger={<Button className="modal-btn btn-large">Login</Button>}
      >
        <form className="sign-up" onSubmit={props.loginUser}>
          <div className="input-field">
            <input type="text" name="username" required/>
            <label for="burger">username</label>
          </div>
          <div className="input-field">
            <input type="text" name="password" required/>
            <label for="topping1">password</label>
          </div>
          <button className="waves-effect waves-light btn red lighten-2" 
                  type="submit"
          >Login</button>
        </form>
        <p>{props.msg ? props.msg : ''}</p>
      </Modal>
    </div>
  )
}