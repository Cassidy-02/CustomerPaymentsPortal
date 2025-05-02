require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const User = require('./models/User');

const app = express();
app.use(helmet());
app.use(cors({origin: 'http://localhost:1433'}));
app.use(express.json());

app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 100})); // Limit each IP to 100 requests per window
app.use('/api/auth', authRoutes);

// Test DB connection and sync
const startServer = async () => {
  try {
    console.log('Starting server with PORT:', process.env.PORT);
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit process with failure
  }
};

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  sequelize.close()
    .then(() => {
      console.log('Database connection closed.');
      process.exit(0);
    });
});
