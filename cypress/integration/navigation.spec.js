describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/")
    //Here we are identifying that we want the <li> element that contains "Tuesday". Important distinction in syntax when looking for css.
    cy.contains("li", "Tuesday")
    .click()
    .should("have.css", "background-color", "rgb(242, 242, 242)")
  });


});

