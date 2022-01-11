import { useState, useEffect } from 'react'
import { getCroupiers, getGames, getLocations } from '../utils/api/get'

const useTableModal = () => {

  const [croupiers, setCroupiers] = useState([])
  const [games, setGames] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    getGames()
      .then(res => {
        setGames(res.data.map((game) => {
          return {
            value: game.id,
            label: game.title
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get games`)
      })

    getCroupiers()
      .then(res => {
        setCroupiers(res.data.map((croupier) => {
          return {
            value: croupier.id,
            label: `${croupier.name} ${croupier.last_name} ${croupier.middle_name}`
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get croupiers`)
      })

      getLocations()
      .then(res => {
        setLocations(res.data.map((location) => {
          return {
            value: location.id,
            label: location.title
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get croupiers`)
      })
  }, [])

  return { croupiers, games, locations }
}

export default useTableModal
