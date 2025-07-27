// Validaciones de Entrada
/// <reference types="cypress" />
describe('Pruebas de Precios y Sectores', () => {
    // Precios negativos
    it('Debe rechazar precio negativo', () => {
    cy.get('#input-precio').type('-500');
    cy.get('#boton-guardar').click();
    cy.contains('El precio no puede ser negativo').should('be.visible');
    });

    // Campos obligatorios vacíos
    it('Debe mostrar error si campos están vacíos', () => {
    cy.get('#boton-guardar').click();
    cy.contains('Este campo es obligatorio').should('exist');
    });

    // Precio no numérico
    it('Debe validar que el precio sea numérico', () => {
    cy.get('#input-precio').type('abc');
    cy.get('#boton-guardar').click();
    cy.contains('El precio debe ser un número válido').should('be.visible');
    });

// Funcionalidades básicas
    // Crear sector con datos válidos
    it('Debe crear un sector correctamente', () => {
    cy.get('#input-nombre').type('VIP');
    cy.get('#input-precio').type('1500');
    cy.get('#input-cantidad').type('50');
    cy.get('#boton-guardar').click();
    cy.contains('Sector guardado exitosamente').should('be.visible');
    });

    // Editar precio de sector existente
    it('Debe modificar el precio de un sector', () => {
    cy.contains('VIP').click();
    cy.get('#input-precio').clear().type('1600');
    cy.get('#boton-guardar').click();
    cy.contains('Precio actualizado').should('be.visible');
    });

// Lógica de Negocio
    // Suma de entradas de sectores debe coincidir con el total
    it('Debe validar la suma total de entradas', () => {
    cy.get('#sector-total').then(($el) => {
        const total = parseInt($el.text());
        expect(total).to.equal(150); // Valor que esperás según el evento
    });
    });

    // Crear sector sin precio
    it('No debe permitir crear sector sin precio', () => {
    cy.get('#input-nombre').type('Balcón');
    cy.get('#input-precio').clear();
    cy.get('#input-cantidad').type('40');
    cy.get('#boton-guardar').click();
    cy.contains('El precio es obligatorio').should('be.visible');
    });
});