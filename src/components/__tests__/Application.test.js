import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, getByTestId, getByDisplayValue } from "@testing-library/react";

import axios from "axios";

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
    const { container } = render(<Application />); 

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. getallbytestid creates an array of dom objects, specifically appointments, that we use .find on
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))

  //Click the "Delete" button on the booked appointment.
  fireEvent.click(queryByAltText(appointment, "Delete"))

  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you want to delete your appointment?")).toBeInTheDocument()
  
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument()

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => queryByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect(queryByText(day, "2 spots remaining")).toBeInTheDocument()
  })

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  // 3. getallbytestid creates an array of dom objects, specifically appointments, that we use .find on
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"))

  //4. Click the "Edit" button on the booked appointment.
  fireEvent.click(queryByAltText(appointment, "Edit"))

  //5. Fire change in Archie Cohen name to Lydia Miller-Jones
  fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
    target: {value: "Lydia Miller-Jones"}
  })

  //6. Click on save button to save change of name 
  fireEvent.click(getByText(appointment, "Save"));

  //7. Ensuring that saving status appears
  expect(getByText(appointment, "Saving")).toBeInTheDocument()

  //8. Lydia-Mille-Jones appointment should now appear in appointment! 
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  // 8. Check that the DayListItem with the text "Monday" still has text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  expect(queryByText(day, "1 spot remaining")).toBeInTheDocument()
  })

  it("shows the save error when failing to save an appointment", async () => {
    //This line prevents the put request from going through
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />); 

    //Ensure that page has loaded by ensuring that Archie Cohen is on the page
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Here we getting the appointment section of the html via it's testID and storing it in a variable
    const appointments = getAllByTestId(container, "appointment");

    //Here we are referincing the first appointment that is empty for us to book into
    const appointment = appointments[0];

    //On the appoinment, click the add button
    fireEvent.click(getByAltText(appointment, "Add"));

    //The next three lines will target changing the input value to a name, selecting an interviewer and clicking save
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    
    //Expect to see saving status briefly
    expect(getByText(appointment, "Saving")).toBeInTheDocument()

    //Expect to see unable to create appointment error on the page
    await waitForElement(() => queryByText(appointment, "Unable to create an appointment, please try again."));

    //Click on close button for error notificatioon
    fireEvent.click(getByAltText(appointment, "Close"));

    //This line ensures that we are returned back to the create component that shows Enter Student Name
    await waitForElement(() => getByPlaceholderText(appointment, "Enter Student Name"));
  });

it("shows the delete error when failing to delete an existing appointment", async () => {
  //This line prevents the put request from going through
  axios.delete.mockRejectedValueOnce();

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
    
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

  fireEvent.click(queryByAltText(appointment, "Delete"))

  await waitForElement(() => queryByText(appointment, "Are you sure you want to delete your appointment?"));

  fireEvent.click(queryByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument()

  await waitForElement(() => getByText(appointment, "Unable to delete the appointment, please try again."));

  fireEvent.click(getByAltText(appointment, "Close"));

  await waitForElement(() => getByText(container, "Archie Cohen"));
  });
});


