const { Jobs } = require('../database/models')
const ApiError = require('../errors/ApiError');


class JobController {

    async getAll(req, res, next) {
        const jobs = await Jobs.findAll()
        return res.json(jobs)
    }

    // async getOne(req, res, next) {
    //     const { id } = req.params
    // }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Jobs.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные должности номер '${id}' были обновлены` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const { title, minSalary, maxSalary } = req.body
            const job = await Jobs.create({
                title: title,
                min_salary: minSalary,
                max_salary: maxSalary
            })

            return res.json(job)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const job = await Jobs.findOne(
            { where: { "id": id } },
        )

        if (!job) {
            return res.json({})
        } else {
            try {
                await job.destroy()

                return res.json({ message: `Доолжность номер '${job.id}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new JobController()