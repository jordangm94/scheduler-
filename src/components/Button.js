import React from "react";

import "components/Button.scss";

import classNames from "classnames";

export default function Button(props) {
  //Now we use a library called class names which gives us the classNames function where we state the first name of the css class that will be stated indefinitely, 
  //then we add the conditionals in an object. In that object we make the css the key and the value the props.confirm or props.danger

  //If props.confirm returns truthy, than the object key, which is css (button--confirm) is added to the button in the first parameter.
  //Designating the class and allowing it to be targeted by class appropriately. 
  let buttonClass = classNames('button', {"button--confirm": props.confirm, "button--danger": props.danger })
  
  //Important note: This is how we handled the conditionals before, we checked if props.confirm is truthy, meaning if confirm prop
  //is actually passed, and if it is then we tack on button--confirm to what use to be the buttonClass = button. 
  // let buttonClass = "button";
  // if (props.confirm) {
  //   buttonClass += " button--confirm";
  // }
  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  return (<button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>);
}
