const { Games, Bets_Types } = require('../database/models')
const ApiError = require('../errors/ApiError');


class GameController {

    async getAll(req, res, next) {
        const games = await Games.findAll()
        return res.json(games)
    }

    async getOne(req, res, next) {
        const { id } = req.params

        const game = await Games.findByPk(id)
        return res.json(game)
    }

    async getBetsTypes(req, res, next) {
        const {id} = req.params
        const betsTypes = await Games.findAll({
            where: {
                id: id
            },
            include: {
                model: Bets_Types,
                through: { attributes: [] },
            }
        })
        return res.json(betsTypes)
    }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Games.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные игры номер '${id}' были обновлены` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const { title } = req.body
            const game = await Games.create({
                title: title
            })

            return res.json(game)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const game = await Games.findOne(
            { where: { "id": id } },
        )

        if (!game) {
            return res.json({})
        } else {
            try {
                await game.destroy()

                return res.json({ message: `Игра номер '${game.id}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new GameController()