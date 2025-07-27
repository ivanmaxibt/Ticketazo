/// <reference types="cypress" />

// Utilidad para registrar logs personalizados
Cypress.Commands.add('logResultado', (mensaje, nombreArchivo = 'log.txt') => {
  const ruta = `reportes/${nombreArchivo}`;
  cy.writeFile(ruta, `${new Date().toISOString()} - ${mensaje}\n`, { flag: 'a+' });
});

// Captura screenshot con nombre automático y timestamp
Cypress.Commands.add('capturaEvidencia', (nombre = 'captura') => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${nombre}-${timestamp}`, { capture: 'viewport' });
});