const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Players = sequelize.define(
    'players', 
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128).BINARY,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(128).BINARY,
            allowNull: false
        },
        middle_name: {
            type: DataTypes.STRING(128).BINARY,
            allowNull: false
        },
        money: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        won: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        lose: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        underscored: true,
        timestamps: false,
    }
)


module.exports = Players