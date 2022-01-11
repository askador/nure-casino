const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Games_Bets_Types = sequelize.define(
    'games_bets_types',
    {
        id: {           
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        }
    },
    {
        underscored: true,
        timestamps: false,
    }
)

module.exports = Games_Bets_Types