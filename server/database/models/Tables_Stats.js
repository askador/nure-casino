const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Tables_Stats = sequelize.define(
    'tables_stats', 
    {
        table_id  : {
            type: DataTypes.INTEGER.UNSIGNED,
            // primaryKey: true,
            allowNull: false,
        },
        profit: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        loss: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        players_amount: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    },
    {
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['table_id', 'date']
            }
        ],
    }
)

module.exports = Tables_Stats