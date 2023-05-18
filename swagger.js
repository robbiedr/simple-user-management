const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = function(app) {
  // Swagger configuration options
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Simple User Management API Documentation',
        version: '1.0.0',
        description: 'Documentation for the API endpoints',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./controllers/*.js'], // Replace with the path to your route files
  };

  // Initialize Swagger
  const swaggerSpec = swaggerJsDoc(options);

  // Serve Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
