const { Bets_Types, Games } = require('../database/models')
const ApiError = require('../errors/ApiError');


class BetsTypesController {

    async getAll(req, res, next) {
        const { gameId } = req.query

        if (gameId) {
            const betsTypes = await Bets_Types.findAll({
                // where: {
                //     game_id: gameId
                // },
                joinTableAttributes: [],
                include: [{
                    model: Games,
                    as: "games",
                    where: {
                        id: gameId
                    },
                    through: { attributes: [] },
                }],
            })

            return res.json(betsTypes)
        }

        const betsTypes = await Bets_Types.findAll({
            // where: {
            //     game_id: gameId
            // },
            joinTableAttributes: [],
            include: [{
                model: Games,
                as: "games",
                through: { attributes: [] },
            }],
        })
        return res.json(betsTypes)
    }

    // // async getOne(req, res, next) {
    // //     const { id } = req.params
    // // }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Bets_Types.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные типа ставки номер '${id}' были обновлены` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async create(req, res, next) {
        try {
            const { label, gameId } = req.body

            const game = await Games.findByPk(gameId)

            const bet = await Bets_Types.create({
                label: label
            })

            await game.addBets_types(bet)

            return res.json(bet)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const bet = await Bets_Types.findOne(
            { where: { "id": id } },
        )

        if (!bet) {
            return res.json({})
        } else {
            try {
                await bet.destroy()

                return res.json({ message: `Тип ставки номер '${bet.id}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new BetsTypesController()