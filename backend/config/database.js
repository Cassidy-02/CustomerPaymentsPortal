const {Sequelize} = require('sequelize');
require('dotenv').config();

// Determine the host based on the environment
    const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
        host: host,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true, // Use encryption for Azure SQL Database
                trustServerCertificate: true // Use this if you are using a self-signed certificate
            }
        }
    
});

// Test connection with error handling
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
