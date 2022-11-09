import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    //The waitForElement function returns a promise that resolves when the callback returns a truthy value and rejects after a time out when it cannot find the specified text
    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />); 

    //container represents all html of component we are rendering, and therefore in html we are looking fro Archie Cohen
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Here we getting the appointment section of the html via it's testID and storing it in a variable
    const appointments = getAllByTestId(container, "appointment");

    //Here we are referincing the first appointment
    const appointment = appointments[0];

    //Here instead of looking at whole container of html, we are looking at appointment and searching for text add (add button) within appointment html
    fireEvent.click(getByAltText(appointment, "Add"));

    //After the add button is clicked, we are expecting the create component to appear with the placeholder text enter student name,
    //We are then entering the studnet name value in here.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    //This simulates us selecting the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //This simulates us clicking the save button
    fireEvent.click(getByText(appointment, "Save"));

    //After the save button is clicked, we expect the status component to display the word Saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    //After the SAVING, we await for the show component which will render the appointment with the student name Lydia-Miller Jones
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    //In this final step we are using the array prototype find to find the day that is titled Monday
    //Important note: The getAllBY converts this into an array of DOM objects with the DAY which is why we can use the array .find prototype
    //thrugh 
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))

    //Lastly, we expect that our Monday should display no spots remaining, and that this text should be in the document.
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument()
  })
});


