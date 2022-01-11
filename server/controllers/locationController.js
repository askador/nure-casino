const { Locations } = require('../database/models')
const ApiError = require('../errors/ApiError');

class LocationController {
    async create(req, res, next) {
        try {
            const { title } = req.body
            const location = await Locations.create({ "title": title })
            return res.json(location)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        const locations = await Locations.findAll()
        return res.json(locations)
    }

    async update(req, res, next) {
        const { id } = req.params
    }

    async delete(req, res, next) {
        const { id } = req.params
        const location = await Locations.findOne(
            { where: { "id": id }, },
        )

        if (!location) {
            return res.json({})
        } else {
            try {
                await location.destroy()
                return res.json({ message: `Локация '${location.title}' успешно удалена!` })

            } catch (e) {
                next(ApiError.badRequest(e.message))
            }
        }

    }
}

module.exports = new LocationController()