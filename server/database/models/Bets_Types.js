const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Bets_Types = sequelize.define(
    'bets_types',
    {
        id: {           
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        label: {           
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        }
    },
    {
        underscored: true,
        timestamps: false,
    }
)

module.exports = Bets_Types