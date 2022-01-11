import { useState, useEffect } from 'react'
import { getPlayers, getTables } from '../utils/api/get'

const useBetModal = () => {

  const [players, setPlayers] = useState([])
  const [tables, setTables] = useState([])

  useEffect(() => {
    getPlayers()
      .then(res => {
        setPlayers(res.data.map((player) => {
          return {
            value: player.id,
            label: `${player.name} ${player.last_name} ${player.middle_name}`
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get players`)
      })

    getTables()
      .then(res => {
        setTables(res.data.map((table) => {
          return {
            value: table.id,
            label: `№${table.id}`
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get tables`)
      })
  }, [])

  return { players, tables }
}

export default useBetModal
