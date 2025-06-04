const {DataTypes} = require('sequelize');
const {sequelize} = require('./index');

const Payment = sequelize.define('Payment', {
   payeeName: {
        type: DataTypes.STRING,
        allowNull: false
        },
   accountNumber: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
              isNumeric: true,
              len: [8, 20] // Assuming account numbers are between 8 and 20 digits
         }
    },
    swiftCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/i // SWIFT code validation
        }
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isNumeric:  true
        }
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
    tableName: 'payments'
});

module.exports = Payment;
// Sync the model with the database