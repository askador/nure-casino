const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Players_Tables = sequelize.define(
    'players_tables',
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
    },
    {
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['player_id']
            }
        ]
    }
)

module.exports = Players_Tables