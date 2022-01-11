import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { createLocation } from '../../utils/api/post'
import './index.scss'


function CreateLocationModal({showCreateLocationModal, handleCreateLocationModalClose}) {

    const [title, setTitle] = useState('')

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleSubmit = async () => {
        const res = await createLocation({
            title: title,
        })

        alert(res.message)
        handleCreateLocationModalClose()
    }



    return (
        <>
             <Modal show={showCreateLocationModal} onHide={handleCreateLocationModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить локацию</Modal.Title>
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
                    <Button variant="secondary" onClick={handleCreateLocationModalClose}>
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

export default CreateLocationModal
