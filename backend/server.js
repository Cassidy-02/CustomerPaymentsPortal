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
app.use(cors({orgin: 'http://localhost:3000'}));
app.use(express.json());

app.use(rateLimit({windows: 15 * 60 * 1000, max: 100})); // Limit each IP to 100 requests per window
app.use('/api/auth', authRoutes);

//Sync DB
sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});
