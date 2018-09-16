import React from 'react';
import { Button } from 'react-materialize'

export default (props) => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="#" class="brand-logo left">Eat That Burger</a>
        <ul className="right">
          <li>Logged in as: {props.user}</li>
          <li>
            <form onSubmit={props.logOut}>
              {props.user ? <Button className="btn red lighten-2" type="submit">Logout</Button> : ''}
            </form>
          </li>
        </ul> 
      </div>
    </nav>
  )
}