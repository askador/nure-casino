const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Locations = sequelize.define(
    'locations',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        }
    },
    {
        underscored: true,
        timestamps: false,
        sequelize
    }
)

module.exports = Locations