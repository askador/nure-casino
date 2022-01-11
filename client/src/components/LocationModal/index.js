import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { updateLocation } from '../../utils/api/put'
import { deleteLocation } from '../../utils/api/delete'
import './index.scss'
import { useHistory } from 'react-router-dom'


function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}

function LocationModal({locationModal, locations, showLocationModal, handleLocationModalClose}) {

    const [location, setLocation] = useState(locationModal)
    const [title, setTitle] = useState(locationModal.title)


    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handlePrevLocation = () => {
        const currentLocationPos = indexOf(locations, location)
        setLocation(locations.at(currentLocationPos - 1))
    }

    const handleNextLocation = () => {
        try {
            const currentLocationPos = indexOf(locations, location)
            setLocation(locations.at(currentLocationPos + 1))
        } catch (e) {
            setLocation(locations.at(0))
        }
    }

    useEffect(() => {
        setTitle(location.title)

        return
    }, [location])

    const handleDeleteLocation = async () => {
        const res = await deleteLocation(location.id)

        alert(res.message)
        handleLocationModalClose()
    }

    const handleSubmit = async () => {
        const res = await updateLocation({
            id: location.id,
            title: title,
        })

        alert(res.message)
        handleLocationModalClose()
    }



    return (
        <>
             <Modal show={showLocationModal} onHide={handleLocationModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Локация {location.title}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevLocation}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextLocation}
                        >&#x3e;</Button>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='minBet'>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={e => handleTitleChange(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDeleteLocation}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handleLocationModalClose}>
                        Закрыть
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LocationModal
