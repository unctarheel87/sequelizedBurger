import React from 'react';
import { Modal, Button } from 'react-materialize'

export default (props) => {
  return(
    <Modal
    trigger={<Button className="modal-btn btn-large">Create A Burger</Button>}
    >
      <form className="new-burger" onSubmit={props.addBurger}>
        <div className="input-field">
          <input type="text" name="burger" required/>
          <label for="burger">Burger Name</label>
        </div>
        <div className="input-field">
          <input type="text" name="topping1" required/>
          <label for="topping1">Topping #1</label>
        </div>
        <div className="input-field">
          <input type="text" name="topping2" required/>
          <label for="topping2">Topping #2</label>
        </div>
        <div className="input-field">
          <input type="text" name="topping3" required/>
          <label for="topping3">Topping #3</label>
        </div>
        <button className="waves-effect waves-light btn red lighten-2 burger-submit-btn" 
                type="submit"
        >Create Burger</button>
      </form>
    </Modal>
  )
}