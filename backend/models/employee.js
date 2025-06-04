const {DataTypes} = require('sequelize');
const {sequelize} = require('./index');
const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: 'employees'
}); 
module.exports = Employee;
// Sync the model with the database