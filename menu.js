const express = require('express');
const { exec } = require('child_process');
const app = express();
const path = require('path');

app.use(express.static('public'));

const rutas = {
  registro: {
    registroComprador: 'cypress/e2e/registroComprador.cy.js',
    registroOrganizadorExitoso: 'cypress/e2e/registroOrganizadorExitoso.cy.js',
    registroOrganizadorEmailRepetido: 'cypress/e2e/registroOrganizadorEmailRepetido.cy.js',
    registroOrganizadorValidacionDatos: 'cypress/e2e/registroOrganizadorValidacionDatos.cy.js'
  },
  login: {
    loginExitoso: 'cypress/e2e/loginExitoso.cy.js',
    loginOrganizador: 'cypress/e2e/loginOrganizador.cy.js'
  },
  flujos: {
    flujoCompradorCompraEntradas: 'cypress/e2e/flujoCompradorCompraEntradas.cy.js',
    flujoOrganizadorCrearEvento: 'cypress/e2e/flujoOrganizadorCrearEvento.cy.js',
    flujoOrganizadorConfigurarEvento: 'cypress/e2e/flujoOrganizadorConfigurarEvento.cy.js',
    flujoOrganizadorDetalleLugarSala: 'cypress/e2e/flujoOrganizadorDetalleLugarSala.cy.js',
    flujoOrganizadorPreciosSectores: 'cypress/e2e/flujoOrganizadorPreciosSectores.cy.js',
    flujoOrganizadorImagenConfirmacion: 'cypress/e2e/flujoOrganizadorImagenConfirmacion.cy.js'
  }
};

app.get('/api/run-test', (req, res) => {
  const seccion = req.query.seccion;
  const nombre = req.query.test;

  const rutaTest = rutas[seccion]?.[nombre];
  if (!rutaTest) return res.status(404).json({ resultado: 'Test no encontrado' });

  exec(`npx cypress run --spec "${rutaTest}"`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ resultado: 'Error', detalle: stderr });
    res.json({ resultado: 'Ejecutado', salida: stdout });
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});