describe('Dynamic Loading', () => { 
it('waits for the hidden element to show', () => { 
cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1'); 
cy.get('#start button').click(); cy.get('#finish h4', { timeout: 10000 }).should('be.visible').and('contain', 'Hello World!'); 
		}); 
});


// Challenge 1: Form Authentication
describe(' Uses  selectors and page interactions', () => {
  
  it('Challenge 1: Form Authentication', () => {
cy.visit('https://the-internet.herokuapp.com/login');
cy.get('#username').type('tomsmith');
cy.get('#password').type('SuperSecretPassword!');
cy.get('button[type="submit"]').click();
cy.url().should('include', '/secure');
cy.contains('h2', 'Secure Area').should('be.visible');
cy.contains('a', 'Logout').should('be.visible');
cy.contains('a', 'Logout').click();
cy.url().should('include', '/login');
cy.contains('h2', 'Login Page').should('be.visible');
  });





  // Challenge 2: Hover Over
  
  it('Challenge 2: Hover Over', () => {
 cy.visit('https://the-internet.herokuapp.com/hovers');

cy.get('.figure').each(($figure, index) => {
cy.wrap($figure).trigger('mouseover');

const expectedText = `name: user${index + 1}`;

cy.wrap($figure).find('h5').should('contain', expectedText);

	});
});




  
  // Challenge 3: Dynamic Controls
  
  it('Challenge 3: Dynamic Controls', () => {
cy.visit('https://the-internet.herokuapp.com/dynamic_controls');

cy.contains('button', 'Remove').click();

cy.get('#checkbox', { timeout: 10000 }).should('not.exist');
cy.contains('#message', "It's gone!").should('be.visible');

cy.contains('button', 'Add').click();

cy.get('#checkbox', { timeout: 10000 }).should('exist').and('be.visible');
cy.contains('#message', "It's back!").should('be.visible');


cy.contains('button', 'Enable').click();
cy.get('#input-example input', { timeout: 10000 }).should('be.enabled').type('Cypress is enabled!');
cy.contains('#message', "It's enabled!").should('be.visible');
  });


// Challenge 4: JavaScript Alerts
it('Challenge 4: Automate interactions with javascript alerts', () => {
  cy.visit('https://the-internet.herokuapp.com/javascript_alerts');

  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alertStub');
  });

  cy.contains('button', 'Click for JS Alert').click();
  cy.get('@alertStub').should('have.been.calledWith', 'I am a JS Alert');
  cy.get('#result').should('contain', 'You successfully clicked an alert');

 
  cy.window().then((win) => {
    cy.stub(win, 'confirm')
      .callsFake((msg) => {
        expect(msg).to.equal('I am a JS Confirm');
        return true; 
      })
      .as('confirmOk');
  });

  cy.contains('button', 'Click for JS Confirm').click();
  cy.get('@confirmOk').should('have.been.calledOnce');
  cy.get('#result').should('contain', 'You clicked: Ok');


  cy.window().then((win) => {

    if (win.confirm && win.confirm.restore) {
      win.confirm.restore();
    }

    cy.stub(win, 'confirm')
      .callsFake((msg) => {
        expect(msg).to.equal('I am a JS Confirm');
        return false; 
      })
      .as('confirmCancel');
  });

  cy.contains('button', 'Click for JS Confirm').click();
  cy.get('@confirmCancel').should('have.been.calledOnce');
  cy.get('#result').should('contain', 'You clicked: Cancel');


  const promptText = 'Hello from Cypress';

  cy.window().then((win) => {
    cy.stub(win, 'prompt').returns(promptText).as('promptStub');
  });

  cy.contains('button', 'Click for JS Prompt').click();
  cy.get('@promptStub').should('have.been.calledWith', 'I am a JS prompt');
  cy.get('#result').should('contain', `You entered: ${promptText}`);
});

  



  // Challenge 5: Drag and Drop
  
  it('Challenge 5: Practice automating drag and drop', () => {
    cy.visit('https://the-internet.herokuapp.com/drag_and_drop');

    const dataTransfer = new DataTransfer();

    cy.get('#column-a').trigger('dragstart', { dataTransfer });
    cy.get('#column-b').trigger('drop', { dataTransfer })
      .trigger('dragend', { dataTransfer });

    cy.get('#column-a header').should('contain', 'B');
    cy.get('#column-b header').should('contain', 'A');
  });




  
  
  // Challenge 6: Floating Menu
  
  it('Challenge 6: Validate and test visibility of floating menu', () => {
    cy.visit('https://the-internet.herokuapp.com/floating_menu');

    cy.scrollTo('bottom');
    cy.get('#menu').should('be.visible');

    cy.get('#menu a').each(($link) => {
      const href = $link.attr('href');
      cy.wrap($link).click();
      cy.url().should('include', href);
    });
  });
});