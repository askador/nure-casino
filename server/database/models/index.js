const Players = require('./Players')
const Players_Tables = require('./Players_Tables')
const Tables = require('./Tables')
const Tables_Stats = require('./Tables_Stats')
const Bets_Types = require('./Bets_Types')
const Games_Bets_Types = require('./Games_Bets_Types')
const Bets = require('./Bets')
const Games = require('./Games')
const Locations = require('./Locations')
const Jobs = require('./Jobs')
const Employees = require('./Employees')

// ------- Associations -------
// bets
Players.hasMany(Bets, {
    foreignKey: 'player_id',
    as: 'bets',
})
Bets.belongsTo(Players, {
    foreignKey: 'player_id',
})

Tables.hasMany(Bets, {
    foreignKey: 'table_id',
    as: 'bets'
})
Bets.belongsTo(Tables, {
    foreignKey: 'table_id',
})

// Bets_Types.hasMany(Bets, {
//     foreignKey: 'bet_type_id',
//     as: 'bet_type'
// })

Bets.belongsTo(Bets_Types, {
    foreignKey: 'bet_type_id',
    as: 'bet_type'
})

Bets_Types.belongsToMany(Games, {
    through: Games_Bets_Types,
    // as: "bets_types",
    foreignKey: "bet_type_id",
})
Games.belongsToMany(Bets_Types, {
    through: Games_Bets_Types,
    foreignKey: "game_id",
})


// players and tables junction relations
Players.belongsToMany(Tables, {
    through: Players_Tables,
    as: "table",
    foreignKey: "player_id",
    onDelete: 'RESTRICT'
})
Tables.belongsToMany(Players, {
    through: Players_Tables,
    as: "players",
    foreignKey: "table_id",
    onDelete: 'RESTRICT'
})

// table location and game
Tables.belongsTo(Games, {
    foreignKey: "game_id",
    onDelete: 'RESTRICT'
})
Tables.belongsTo(Locations, {
    foreignKey: "location_id",
    onDelete: 'RESTRICT'
})

// tables stats
Tables.hasMany(Tables_Stats, {
    foreignKey: 'table_id',
    as: 'stats'
})
Tables_Stats.belongsTo(Tables, {
    foreignKey: 'table_id',
})


// employees jobs
// Jobs.hasOne(Employees)
Employees.belongsTo(Jobs, {
    foreignKey: 'job_id',
    as: 'job',
    onDelete: 'RESTRICT'
})


// tables employees
Employees.hasOne(Tables, {
    foreignKey: 'croupier_id',
    onDelete: 'RESTRICT'
})
Tables.belongsTo(Employees, {
    foreignKey: 'croupier_id',
    as: 'croupier',
})

// ---- End of associations ---


module.exports = {
    Players,
    Players_Tables,
    Tables,
    Bets_Types,
    Games_Bets_Types,
    Bets,
    Tables_Stats,
    Games,
    Locations,
    Jobs,
    Employees
}