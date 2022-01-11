const { Players, Tables } = require('../database/models')
const ApiError = require('../errors/ApiError');


class PlayerController {

    async getAll(req, res, next) {
        const players = await Players.findAll()
        return res.json(players)
    }

    async getOne(req, res, next) {
        const { id } = req.params
        const player = await Players.findOne({ 
            where: { id: id },
            include: {
                model: Tables,
                as: "table"
                // through: { attributes: [] },
            }
        })
        return res.json(player)
    }

    async update(req, res, next) {
        const { id } = req.params

        try {
            await Players.update(req.body, {
                where: { id: id }
            })
            return res.json({ message: `Данные игрока номер '${id}' были обновлены` })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const { name, lastName, middleName, money, won, lose } = req.body
            const player = await Players.create({
                "name": name,
                "last_name": lastName,
                "middle_name": middleName,
                "money": money,
                "won": won,
                "lose": lose
            })

            return res.json(player)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        const player = await Players.findOne(
            { where: { "id": id } },
        )

        if (!player) {
            return res.json({})
        } else {
            try {
                await player.destroy()

                return res.json({ message: `Игрок номер '${player.id}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new PlayerController()