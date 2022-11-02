import React from "react";

import Button from "components/Button";

//This delete confirm component depends on the button we implemented before as you can see in html,
//hence why we must import it here! 

export default function Confirm() {
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">Delete the appointment?</h1>
      <section className="appointment__actions">
        <Button danger>Cancel</Button>
        <Button danger>Confirm</Button>
      </section>
    </main>
  );
}
