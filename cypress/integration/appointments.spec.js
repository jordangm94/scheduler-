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

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]")
    .first()
    .click({ force: true });

    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones")
    cy.get("[alt='Tori Malcolm']").click();
    
    // Clicks the save button
    cy.contains("Save").click();

    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });

    // Clicks the confirm button
    cy.contains("Confirm").click();

    // Ensure that deleting status component appears
    cy.contains("Deleting").should("exist");
    
    // Ensure that deleting status component dissapears
    cy.contains("Deleting").should("not.exist")
    
    //Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen")
    .should("not.exist");
  });
});