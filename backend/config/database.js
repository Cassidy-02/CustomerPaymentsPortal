const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true, // Use this if you're on Windows Azure
            trustServerCertificate: true, // Change to true for local dev / self-signed certs
            server: process.env.DB_HOST, // Add server property as required by MSSQL dialect
            port: 1433 // Explicitly specify port for MSSQL connection
        }
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false // Disable logging; set to console.log to enable
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
