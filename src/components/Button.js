import React from "react";

import "components/Button.scss";

import classNames from "classnames";

//The bottom of this document contains extended notes related to this button component

export default function Button(props) {
  let buttonClass = classNames('button', {"button--confirm": props.confirm, "button--danger": props.danger })

  return (<button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>);
}

//Extended notes:

//Now we use a library called class names which gives us the classNames function where we state the first name of the css class that will be stated indefinitely, 
//then we add the conditionals in an object. In that object we make the css the key and the value the props.confirm or props.danger

//If props.confirm returns truthy, than the object key (which is css i.e. button--confirm) becomes the new css for the button.

//Important note: This is how we handled the conditionals before classNames function, we checked if props.confirm is truthy, meaning if confirm prop
//is actually passed, and if it is then we tack on button--confirm to what use to be the buttonClass = button. 
// let buttonClass = "button";
// if (props.confirm) {
//   buttonClass += " button--confirm";
// }
// if (props.danger) {
//   buttonClass += " button--danger";
// }