const { Employees, Jobs, Players, Locations, Games, Tables, Tables_Stats, Bets, Bets_Types, Games_Bets_Types, Players_Tables } = require('./models')

function getISODate(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    return date.toISOString()
}


const jobs = [
    {
        id: 1,
        title: "Крупье"
    },
    {
        id: 2,
        title: "Менеджер"
    },
    {
        id: 3,
        title: "Администратор"
    },
]

const employees = [
    {
        id: 1,
        name: "Иван",
        last_name: "Иванко",
        middle_name: "Иванович",
        salary: 500,
        photo: "default.png",
        job_id: 1,
    },
    {
        id: 2,
        name: "Артем",
        last_name: "Артемко",
        middle_name: "Артемович",
        salary: 444,
        photo: "default.png",
        job_id: 2,
    },
    {
        id: 3,
        name: "Михаил",
        last_name: "Михаилко",
        middle_name: "Михаилович",
        salary: 231,
        photo: "default.png",
        job_id: 3,
    },
    {
        id: 4,
        name: "Виталий",
        last_name: "Виталко",
        middle_name: "Виталиевич",
        salary: 544,
        photo: "default.png",
        job_id: 1,
    },
    {
        id: 5,
        name: "Петр",
        last_name: "Петралко",
        middle_name: "Петрович",
        salary: 123,
        photo: "default.png",
        job_id: 2,
    },
    {
        id: 6,
        name: "Иля",
        last_name: "Иляко",
        middle_name: "Илякович",
        salary: 123,
        photo: "default.png",
        job_id: 1,
    },
]

const players = [
    {
        name: "Иван",
        last_name: "Иванко",
        middle_name: "Иванович",
        money: 100,
        won: 1000,
        lose: 50000
    },
    {
        name: "Дмитрий",
        last_name: "Дмитрийко",
        middle_name: "Дмитриевич",
        money: 5000,
        won: 10000,
        lose: 200
    },
    {
        name: "Артем",
        last_name: "Артемко",
        middle_name: "Артемович",
        money: 6000,
        won: 3000,
        lose: 4564
    },
    {
        name: "Богдан",
        last_name: "Богданко",
        middle_name: "Богданович",
        money: 10150,
        won: 55510,
        lose: 656569
    },
    {
        name: "Сергей",
        last_name: "Сергейко",
        middle_name: "Сергеевич",
        money: 5545451,
        won: 132020651,
        lose: 5000
    },
]

const tables = [
    {
        id: 1,
        min_bet: 500,
        game_id: 1,
        location_id: 1,
        croupier_id: 1,
    },
    {
        id: 2,
        min_bet: 1000,
        game_id: 1,
        location_id: 1,
        croupier_id: 4,
    },
    {
        id: 3,
        min_bet: 10,
        game_id: 1,
        location_id: 2,
        croupier_id: 6,
    },
]

const games = [
    {
        title: "Покер"
    },
    {
        title: "Рулетка"
    },
    {
        title: "Блэкджек"
    }
]

const locations = [
    {
        title: "Холл"
    },
    {
        title: "Фойе"
    },
]

const tables_stats = [
    {
        table_id: 1,
        profit: 100000,
        loss: 2000,
        players_amount: 1000,
        date: getISODate(-10)
    },
    {
        table_id: 2,
        profit: 45546,
        loss: 6456,
        players_amount: 553,
        date: getISODate(-10)
    },
    {
        table_id: 1,
        profit: 60000,
        loss: 51531,
        players_amount: 500,
        date: getISODate(-9)
    },
    {
        table_id: 2,
        profit: 45345,
        loss: 34533,
        players_amount: 1000,
        date: getISODate(-9)
    },
    {
        table_id: 1,
        profit: 8191511,
        loss: 5511,
        players_amount: 721,
        date: getISODate(-8)
    },
    {
        table_id: 2,
        profit: 45345343,
        loss: 4534,
        players_amount: 2300,
        date: getISODate(-8)
    },
    {
        table_id: 1,
        profit: 2102310,
        loss: 65151,
        players_amount: 1231,
        date: getISODate(-7)
    },
    {
        table_id: 2,
        profit: 45664564,
        loss: 453,
        players_amount: 34,
        date: getISODate(-7)
    },
    {
        table_id: 1,
        profit: 65156111,
        loss: 35151,
        players_amount: 1200,
        date: getISODate(-6)
    },
]

const bets_types = [
    {
        id: 1,
        label: "Колл"
    },
    {
        id: 2,
        label: "Рейз"
    },
    {
        id: 3,
        label: "Пасс"
    },
    {
        id: 4,
        label: "Олл-ин"
    },
    {
        id: 5,
        label: "Победа"
    },
    {
        id: 6,
        label: "Красное"
    },
    {
        id: 7,
        label: "Черное"
    }
]

const bets = [
    {
        amount: 1231,
        bet_type_id: 1,
        player_id: 1,
        table_id: 1,
        date: getISODate(-10)
    },
    {
        amount: 4233,
        bet_type_id: 1,
        player_id: 2,
        table_id: 1,
        date: getISODate(-10)
    },
    {
        amount: 213123,
        bet_type_id: 4,
        player_id: 4,
        table_id: 2,
        date: getISODate(-9)
    },
    
    {
        amount: 234234,
        bet_type_id: 1,
        player_id: 1,
        table_id: 1,
        date: getISODate(-9)
    },
    
    {
        amount: 4233,
        bet_type_id: 1,
        player_id: 2,
        table_id: 1,
        date: getISODate(-8)
    },
    
    {
        amount: 342,
        bet_type_id: 1,
        player_id: 2,
        table_id: 1,
        date: getISODate(-8)
    },
    {
        amount: 2124,
        bet_type_id: 2,
        player_id: 2,
        table_id: 1,
        date: getISODate(-7)
    },
    {
        amount: 123,
        bet_type_id: 1,
        player_id: 2,
        table_id: 1,
        date: getISODate(-5)
    },
]

const games_bets_types = [
    {
        game_id: 1,
        bet_type_id: 1
    },
    {
        game_id: 1,
        bet_type_id: 2
    },
    {
        game_id: 1,
        bet_type_id: 3
    },
    {
        game_id: 1,
        bet_type_id: 4
    },
    {
        game_id: 3,
        bet_type_id: 5
    },
    {
        game_id: 2,
        bet_type_id: 6
    },
    {
        game_id: 2,
        bet_type_id: 7
    }
    
    
]

const players_tables = [
    {
        player_id: 1, 
        table_id: 1,
    },
    {
        player_id: 2,
        table_id: 1
    },
    {
        player_id: 3,
        table_id: 2
    },
    {
        player_id: 4,
        table_id: 2
    }
]

module.exports = async () => {
    await Jobs.bulkCreate(jobs)
    await Locations.bulkCreate(locations)
    await Games.bulkCreate(games)
    await Employees.bulkCreate(employees)
    await Players.bulkCreate(players)
    await Tables.bulkCreate(tables)
    await Tables_Stats.bulkCreate(tables_stats)
    await Bets_Types.bulkCreate(bets_types)
    await Bets.bulkCreate(bets)
    await Games_Bets_Types.bulkCreate(games_bets_types)
    await Players_Tables.bulkCreate(players_tables)
}

