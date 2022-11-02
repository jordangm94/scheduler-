import React from "react";

export default function Empty(props) {
  //Note we are calling onAdd function at end of image tag so that this event fires
  //only when clicking on the + image, not the whole component! 
  return (
    <main className="appointment__add">
      <img className="appointment__add-button" src="images/add.png" alt="Add" onClick={props.onAdd} />
    </main>
  );
}
