
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { createGame } from '../../utils/api/post'
import './index.scss'


function CreateGameModal({showCreateGameModal, handleCreateGameModalClose}) {

    const [title, setTitle] = useState('')

    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handleSubmit = async () => {
        const res = await createGame({
            title: title,
        })

        alert(res.message)
        handleCreateGameModalClose()
    }



    return (
        <>
             <Modal show={showCreateGameModal} onHide={handleCreateGameModalClose} animation={true} centered>
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
                    <Button variant="secondary" onClick={handleCreateGameModalClose}>
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

export default CreateGameModal
