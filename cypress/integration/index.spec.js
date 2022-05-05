/// <reference types="cypress" />

describe('LightBox', () => {
  beforeEach(() => {
      cy.visit('../../index.html')
  });

  it('Open box', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=openLightbox]').should('be.visible')
  });

  it('Close box', () => { 
    cy.get('[data-cy=openLightbox]').click()

    cy.get('body').click("topLeft");

    cy.get('[data-cy=closeLightbox]').should("not.be.visible");
  });

  it('Add like', () => { 
    cy.get('[data-cy=openLightbox]').click()
  
    cy.get('[data-cy=like]').click()

    cy.get('[data-cy=likesCount]').should('contain', '1')

    cy.get('[data-cy=likesCountOverlay]').should('contain', '1')
  });

  it('Remove like', () => { 
    cy.get('[data-cy=openLightbox]').click()
  
    cy.get('[data-cy=like]').click()

    cy.get('[data-cy=dislike]').click()

    cy.get('[data-cy=likesCount]').should('contain', '0')

    cy.get('[data-cy=likesCountOverlay]').should('contain', '0')
  });

  it('Add comment', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome')

    cy.get('[data-cy=publishComment]').click()
  });

  it('Add void comment', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=publishComment]').should('be.disabled')
  });

  it('Hide comment', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=showComments]').click()

    cy.get('[data-cy=commentList]').should('not.be.visible')
  });

  it('Count comment', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=commentsCountOverlay]').should('contain', '1')

    cy.get('[data-cy=showComments]').should('contain', 'Hide 1 comment')
  });

  it('Comment(s)', () => {
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=showComments]').should('contain', 'Hide 1 comment')

    cy.get('[data-cy=commentInput]').clear().type('Awsome 2')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=showComments]').should('contain', 'Hide 2 comments')
  });

  it('Delete comment = Awsome 2', () => { 
    cy.get('[data-cy=openLightbox]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome 1')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome 2')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=commentInput]').clear().type('Awsome 3')

    cy.get('[data-cy=publishComment]').click()

    cy.get('[data-cy=deleteComment]').eq(1).click();

    cy.get('[data-cy=showComments]').should('contain', 'Hide 2 comments')
  });
})