import React from 'react';
import { Button } from 'react-materialize'

export default (props) => {
  return (
    <nav>
      <p>Logged in as: {props.user}</p>
      <form onSubmit={props.logOut}>
        <Button className="modal-btn btn" type="submit">Logout</Button>
      </form>
    </nav>
  )
}