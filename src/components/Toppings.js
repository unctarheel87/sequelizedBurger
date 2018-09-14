import React from 'react'

export default (props) => {
  return (
    <ul>
      {props.toppings.map((topping) => {
        return <li>{topping.topping_name}</li>
      })}
    </ul>
  );
}