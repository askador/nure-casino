const sequelize = require('../connection')
const {DataTypes} = require('sequelize')

const Employees = sequelize.define(
    'employees',
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        salary: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'default.png'
        }
    },
    {
        underscored: true,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['name', 'last_name', 'middle_name', 'salary', 'job_id']
            }
        ],
    }
)

module.exports = Employees