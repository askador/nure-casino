const sequelize = require('../connection')
const { DataTypes } = require('sequelize')

const Jobs = sequelize.define(
    'jobs',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        min_salary: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        max_salary: {
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

module.exports = Jobs