import React from 'react'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import Toppings from './Toppings'

export const Burgers = (props) => {
  const burgerList = props.burgers.map((burger) => {
    if(!burger.devoured) {
      return (
        <div className="burger-card">
          <Collapsible popout defaultActiveKey={1}>
            <CollapsibleItem header={burger.burger_name} icon='menu'>
              <Toppings toppings={burger.toppings} />
            </CollapsibleItem>
          </Collapsible>
          <button className="waves-effect waves-light btn red lighten-2 update-burger-btn"
                  onClick={(e) => {
                    props.updateBurger(e, burger.id)
                  }}
          ><i class="material-icons left">local_dining</i>Devour!</button>
        </div>
      )
    }
  });
  const devouredBurgers = props.burgers.map((burger) => {
    if(burger.devoured) {
      return (
        <div className="card devoured">
          <p>{burger.burger_name}</p>
          <button className="delete-burger-btn" onClick={(e) => {
            props.deleteBurger(e, burger.id)
          }}
          >X</button>
        </div>   
      )
    }
  });
  return (
    <div className="burger-container">  
      <div className="burger-list">
        {burgerList}
      </div>
      <div className="devoured-burgers">
        {devouredBurgers}
      </div>
    </div> 
  );
}