import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createPlayer } from '../../utils/api/post'
import './index.scss'

const CreatePlayerModal = ({ showCreatePlayerModal, handleCreatePlayerModalClose }) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [money, setMoney] = useState(0)
    const [won, setWon] = useState(0)
    const [lose, setLose] = useState(0)


    const handleNameChange = (value) => {
        setName(value)
    }
    const handleLastNameChange = (value) => {
        setLastName(value)
    }
    const handleMiddleNameChange = (value) => {
        setMiddleName(value)
    }
    const handleMoneyChange = (value) => {
        setMoney(value)
    }
    const handleWonChange = (value) => {
        setWon(value)
    }
    const handleLoseChange = (value) => {
        setLose(value)
    }


    const handleSubmit = async () => {
        const res = await createPlayer({
            name: name,
            lastName: lastName,
            middleName: middleName,
            money: money,
            won: won,
            lose: lose
        })

        alert(res.message)
        if ("error" in res) return 
        handleCreatePlayerModalClose()
    }


    return (
        <>
            <Modal show={showCreatePlayerModal} onHide={handleCreatePlayerModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить игрока</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId='name'>
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => handleNameChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='last-name'>
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastName}
                                onChange={e => handleLastNameChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='middle-name'>
                            <Form.Label>Отчество</Form.Label>
                            <Form.Control
                                type="text"
                                value={middleName}
                                onChange={e => handleMiddleNameChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='money'>
                            <Form.Label>Капитал</Form.Label>
                            <Form.Control
                                type="text"
                                value={money}
                                onChange={e => handleMoneyChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='won'>
                            <Form.Label>Выиграно</Form.Label>
                            <Form.Control
                                type="text"
                                value={won}
                                onChange={e => handleWonChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='lose'>
                            <Form.Label>Проиграно</Form.Label>
                            <Form.Control
                                type="text"
                                value={lose}
                                onChange={e => handleLoseChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreatePlayerModalClose}>
                        Закрыть
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreatePlayerModal
