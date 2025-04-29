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
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());

app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 100})); // Limit each IP to 100 requests per window
app.use('/api/auth', authRoutes);

// Test DB connection and sync
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
