import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
connectDB();

// Cấu hình Swagger OpenAPI 3.0
const swaggerOptions = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'CRUD User API',
      version: '1.0.0',
      description: 'Tài liệu OpenAPI 3.0 / Swagger UI cho dịch vụ Quản lý Người dùng (CRUD User API)',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📚 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
});