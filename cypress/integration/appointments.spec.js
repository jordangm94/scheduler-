describe("Appointment", () => {
  //Beforeeach running in scope of describe, this will apply before each of below tests is run
  beforeEach(() => {
    //Clear database with each rerun of the test
    cy.request("GET", "/api/debug/reset")
    // Visits the root of our web server and ensures we are on Monday
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    //.first ensures that we click on the first DOM element within a set of DOM elements, since there are 
    //two add buttons, one belonging to first appointment which is hidden.
    .first()
    .click();
    // Get form input section by test id and enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    //Removed line searching for Sylvia Palmer as interviewer for Lydia, to prevent confusion with other appointment with Sylvia on this page
  });


});