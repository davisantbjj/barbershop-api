const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota principal
app.get('/', (req, res) => {
  res.status(200).json({
    message: '💈 Bem-vindo à Barbershop API',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/auth',
      clients: '/api/clients',
      services: '/api/services',
      barbers: '/api/barbers',
      appointments: '/api/appointments'
    }
  });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Rotas
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/barbers', require('./routes/barberRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
