import api from '../api'

const testData = [
  {
      "id": 1,
      "min_bet": 500,
      "game_id": 1,
      "location_id": 1,
      "croupier_id": 2,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Холл"
      },
      "croupier": {
          "name": "Артем",
          "last_name": "Артемко",
          "middle_name": "Артемович",
          "salary": 444,
          "photo": "default.png",
          "job_id": 2
      }
  },
  {
      "id": 2,
      "min_bet": 1000,
      "game_id": 1,
      "location_id": 1,
      "croupier_id": 3,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Холл"
      },
      "croupier": {
          "name": "Михаил",
          "last_name": "Михаилко",
          "middle_name": "Михаилович",
          "salary": 231,
          "photo": "default.png",
          "job_id": 3
      }
  },
  {
      "id": 3,
      "min_bet": 10,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 1,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Иван",
          "last_name": "Иванко",
          "middle_name": "Иванович",
          "salary": 500,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 4,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  },
  {
      "id": 5,
      "min_bet": 5,
      "game_id": 1,
      "location_id": 2,
      "croupier_id": 4,
      "game": {
          "title": "Покер"
      },
      "location": {
          "title": "Фойе"
      },
      "croupier": {
          "name": "Виталий",
          "last_name": "Виталко",
          "middle_name": "Виталиевич",
          "salary": 544,
          "photo": "default.png",
          "job_id": 1
      }
  }
]

const getTables = async (id) => {
    id = id ? id : ''
    return(api.get(`/tables/${id}`))
//   return {data: testData}
}

export default getTables
