const { Employees, Jobs, Tables } = require('../database/models')
const ApiError = require('../errors/ApiError');
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

class EmployeeController {

    async getAll(req, res, next) {
        const employees = await Employees.findAll({
            include: [
                {
                    model: Jobs,
                    as: 'job'
                },
            ]
        })
        return res.json(employees)
    }

    async getCroupiers(req, res, next) {
        const croupiers = await Employees.findAll({
            where: {
                job_id: 1
            }
        })
        return res.json(croupiers)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const employee = await Employees.findOne(
            {
                where: { id: id },
                include: [
                    {
                        model: Jobs,
                        as: 'job'
                    },
                ]
            },
        )

        return res.json(employee)
    }

    async update(req, res, next) {
        const { id } = req.params
        let body = req.body
        try {
            if (req.files && 'photo' in req.files) {
                const { photo } = req.files
                const fileName = uuid.v4() + '.jpg'
                photo.mv(path.resolve(__dirname, '..', 'static', 'employees', fileName))
                body.photo = fileName

                const photoToDelete = (await Employees.findByPk(id)).photo
                if (photoToDelete !== 'default.png') {
                    fs.unlinkSync(path.resolve(__dirname, '..', 'static', 'employees', photoToDelete))
                }
            }


            for (const [key, value] of Object.entries(body)) {
                if (value === 'undefined') {
                    delete body[key]
                }
            }


            await Employees.update(body, {
                where: { id: id }
            })

            return res.json({ message: `Данные сотрудника номер '${id}' были обновлены` })//employee)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {

            for (const [key, value] of Object.entries(req.body)) {
                if (value == 'undefined') {
                    return next(ApiError.badRequest({ message: "Произошла ошибка. Заполните все поля!" }))
                }
            }



            const { name, lastName, middleName, jobId, salary } = req.body
            const { photo } = req.files
            const fileName = uuid.v4() + '.jpg'



            const employee = await Employees.create({
                "name": name,
                "last_name": lastName,
                "middle_name": middleName,
                "job_id": jobId,
                "salary": salary,
                "photo": fileName,
            })



            photo.mv(path.resolve(__dirname, '..', 'static', 'employees', fileName))

            return res.json(employee)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const employee = await Employees.findOne(
            { where: { "id": id }, },
        )

        if (!employee) {
            return res.json({})
        } else {
            try {
                await employee.destroy()

                return res.json({ message: `Сотрудник номер '${employee.id}' успешно удален!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new EmployeeController()