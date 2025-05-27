require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { sequelize} = require('./models');


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 100})); // Limit each IP to 100 requests per window
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
// Handle 404 errors
