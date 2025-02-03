require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const apiKeyAuth = require('./middleware/apiKey');
const rateLimiter = require('./middleware/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// API Key authentication for all routes
app.use('/api', apiKeyAuth);

// Routes
app.use('/api', routes);

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use(errorHandler);

// Only start the server if file is run directly (not in test environment)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;