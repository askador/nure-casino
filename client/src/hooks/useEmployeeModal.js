import { useState, useEffect } from 'react'
import { getJobs } from '../utils/api/get'

const useEmployeeModal = () => {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    getJobs()
      .then(res => {
        setJobs(res.data.map((job) => {
          return {
            value: job.id,
            label: job.title
          }
        }))
      })
      .catch(err => {
        alert(`${err.message}. Can't get jobs`)
      })
  }, [])

  return { jobs }
}

export default useEmployeeModal
