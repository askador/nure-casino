const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Bets = sequelize.define(
    'bets',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        amount: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        bet_type_id: {
            type: DataTypes.INTEGER.UNSIGNED,
        },
        player_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false
        },
        table_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['amount', 'bet_type_id', 'player_id', 'table_id', 'date']
            }
        ],
    }
)

module.exports = Bets