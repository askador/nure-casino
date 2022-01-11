const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Games = sequelize.define(
    'games',
    {
        id: {           
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true
        }
    },
    {
        underscored: true,
        timestamps: false,
    }
)

module.exports = Games