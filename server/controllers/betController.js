const { Bets, Bets_Types, Players, Tables } = require('../database/models')
const ApiError = require('../errors/ApiError');
const { Op } = require('sequelize')

function getISODate(day, date) {
    date.setDate(date.getDate() + day)
    return date.toISOString()
}



class BetController {

    async getAll(req, res, next) {

        if ("playerId" in req.query) {
            let { playerId, date, tableId } = req.query

            date = new Date(new Date(date).toDateString())

            const bets = await Bets.findAll({
                where: {
                    player_id: playerId,
                    date: {
                        [Op.gte]: date.toISOString(),
                        [Op.lte]: getISODate(+1, date)
                    },
                    table_id: tableId
                },
                order: [
                    ['date', "DESC"]
                ],
                include: [
                    {
                        model: Bets_Types,
                        as: 'bet_type'
                    },
                    {
                        model: Players,
                        as: 'player'
                    }, {
                        model: Tables,
                        as: 'table'
                    },
                ]
            })
            return res.json(bets)
        }

        const bets = await Bets.findAll({
            order: [
                ['date', "DESC"]
            ],
            include: [
                {
                    model: Bets_Types,
                    as: 'bet_type'
                },
                {
                    model: Players,
                    as: 'player'
                }, {
                    model: Tables,
                    as: 'table'
                },
            ]
        })
        return res.json(bets)
    }

    // async getOne(req, res, next) {
    //     const { id } = req.params
    // }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Bets.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные ставки номер '${id}' были обновлены` })
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

            const { amount, betTypeId, playerId, tableId } = req.body
            const bet = await Bets.create({
                amount: amount,
                bet_type_id: betTypeId,
                player_id: playerId,
                table_id: tableId,
                date: (new Date()).toISOString()
            })

            return res.json(bet)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const bet = await Bets.findOne(
            { where: { "id": id } },
        )

        if (!bet) {
            return res.json({})
        } else {
            try {
                await bet.destroy()

                return res.json({ message: `Ставка номер '${bet.id}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new BetController()