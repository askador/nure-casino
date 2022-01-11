import { useState, useEffect } from 'react'
import { getBetsTypesByGameID } from '../utils/api/get'

const useBetModal = (gameId) => {

  const [betTypes, setBetTypes] = useState([])

  useEffect(() => {
    getBetsTypesByGameID(gameId)
      .then(res => {
        setBetTypes(res.data.map((betType) => {
          return {
            value: betType.id,
            label: betType.label
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get bet types`)
      })

  }, [])

  return betTypes
}

export default useBetModal
