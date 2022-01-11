const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Tables = sequelize.define(
    'tables', 
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        min_bet: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            validate: {
                min: 0
            }
        },

    },
    {
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['croupier_id']
            }
        ],
    }
)

module.exports = Tables