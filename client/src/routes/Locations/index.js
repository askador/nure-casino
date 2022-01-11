import React from 'react'
import getLocations from '../../utils/api/get/getLocations';
import { useEffect, useState } from 'react'
import { LocationModal, CreateLocationModal } from '../../components'
import './index.scss'
import { Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';


function Locations() {

    const [locations, setLocations] = useState([])
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showCreateLocationModal, setShowCreateLocationModal] = useState(false);
    const [locationModal, setLocationModal] = useState({})
  
  
  
    const handleLocationModalClose = () => {
      setShowLocationModal(false)
      setLocationModal({})
    }
    const handleLocationModalShow = (location) => {
      setLocationModal(location)
      setShowLocationModal(true)
    }
  
    const openLocationModal = (location) => {
      handleLocationModalShow(location)
    }
  
  
    const handleCreateLocationModalClose = () => {
      setShowCreateLocationModal(false)
    }
    const handleCreateLocationModalShow = () => {
      setShowCreateLocationModal(true)
    }
    const openCreateLocationModal = () => {
      handleCreateLocationModalShow()
    }
  
  
    const handleCreateLocation = () => {
      openCreateLocationModal()
    }
  
    useEffect(() => {
      getLocations()
        .then(res => {
          setLocations(res.data)
        })
        .catch(err => {
          alert(err.message)
        })
      // setDecks(decksList)
    }, [showLocationModal, showCreateLocationModal])

    return (
        <div className='locations'>
        <div className="functional">
          {/* <a className="link_btn" data-tip data-event='click focus'>
            Условия для Лока
          </a>
          <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
            <div>
              - Мимальная ставка целое число не меньше 0<br />
              - Нельзя ставить занятого крупье
            </div>} /> */}
          <Button variant="success" onClick={handleCreateLocation}>Добавить локацию</Button>
        </div>
  
        <div className='tables-data'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
              </tr>
            </thead>
            <tbody>
  
              {locations.map(
                (location, index) => {
                  return (
                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openLocationModal(location)}>
                      <td>{location.id}</td>
                      <td>{location.title}</td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
        </div>
  
  
        {showLocationModal ? <LocationModal locationModal={locationModal} locations={locations} showLocationModal={showLocationModal} handleLocationModalClose={handleLocationModalClose} /> : null}
        {showCreateLocationModal ? <CreateLocationModal handleCreateLocationModalClose={handleCreateLocationModalClose} showCreateLocationModal={showCreateLocationModal} /> : null}
  
      </div>
    )
}

export default Locations
