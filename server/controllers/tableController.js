const { Tables, Tables_Stats, Games, Locations, Employees } = require('../database/models')
const ApiError = require('../errors/ApiError');
const { literal } = require('sequelize')

class TableController {

    async getAll(req, res, next) {
        const tables = await Tables.findAll({
            include: [
                {
                    model: Games,
                    as: 'game',
                    attributes: ["title"]
                },
                {
                    model: Locations,
                    as: 'location',
                    attributes: ['title']
                },
                {
                    model: Employees,
                    as: 'croupier',
                    attributes: {
                        exclude: ['id']
                    }
                },
            ],
        })
        return res.json(tables)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const table = await Tables.findOne({
            where: { id: id },
            // include:
            // {
            //     model: Tables_Stats,
            //     as: 'stats',
            // },
            // order: [
            //     [literal('`stats.date`'), "ASC"]
            //   ]
        })


        return res.json(table)
    }

    async getStats(req, res, next) {
        const { id } = req.params

        if ("date" in req.query) {
            const stats = await Tables_Stats.findOne({
                where: {
                    table_id: id,
                    date: req.query.date
                }
            })
            return res.json(stats)
        }

        const stats = await Tables_Stats.findAll({
            where: {
                table_id: id
            },
            order: [
                ['date', "ASC"]
            ]
        })
        return res.json(stats)
    }

    async getStatsByDate(req, res, next) {
        const {id} = req.params
        const {date} = req.query
        const stats = await Tables_Stats.findOne({
            where: {
                table_id: id
            }
        })
    }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Tables.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные стола номер '${id}' были обновлены` })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }

    async create(req, res, next) {
        try {
            const { minBet, gameId, locationId, croupierId } = req.body

            const table = await Tables.create({
                "min_bet": minBet,
                "game_id": gameId,
                "location_id": locationId,
                "croupier_id": croupierId
            })
            // return res.json(table)
            return res.json({message: "Стол успешно создан!"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const table = await Tables.findOne(
            { where: { "id": id }, },
        )

        if (!table) {
            return res.json({})
        } else {
            try {
                await table.destroy()

                return res.json({ message: `Стол номер '${table.id}' успешно удален!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new TableController()