describe("Billionaire Research Flow", () => {
    it("should allow user to select billionaire and see movie list", () => {
      // Visit the homepage
      cy.visit("http://localhost:3000");
  
      // Click on the first billionaire card
      cy.get('[data-testid="billionaire-card"]').first().click();
  
      // Wait for the research screen and completion
      cy.contains("Running research pipeline").should("exist");
  
      // Wait for result
cy.contains("🎬 Recommended Movies", { timeout: 10000 }).should("be.visible");
  
      // Check that at least one movie card is rendered
      cy.get('[data-testid="movie-card"]').should("have.length.at.least", 1);
    });
  });
  