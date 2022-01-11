import React, { useState, useRef } from 'react'
import { Modal, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import Select from 'react-select'
import useTableModal from '../../hooks/useTableModal'
import createTable from '../../utils/api/post/createTable'
import './index.scss'

const CreateTableModal = ({ showCreateTableModal, handleCreateTableModalClose }) => {
    const [minBet, setMinBet] = useState(0)
    const [croupier, setCroupier] = useState({})
    const [game, setGame] = useState({})
    const [location, setLocation] = useState({})

    const { croupiers, games, locations } = useTableModal()

    const handleMinBetChange = (value) => {
        setMinBet(value)
    }
    const handleCroupierSelect = (option) => {
        setCroupier(croupiers.find(x => x.value === option.value))
    }
    const handleGameSelect = (option) => {
        setGame(games.find(x => x.value === option.value))
    }
    const handleLocationSelect = (option) => {
        setLocation(locations.find(x => x.value === option.value))
    }

    const handleSubmit = async () => {
        const res = await createTable({
            minBet: minBet,
            gameId: game?.value,
            locationId: location?.value,
            croupierId: croupier?.value
        })

        alert(res.message)

        if ("error" in res) return
        handleCreateTableModalClose()
    }


    return (
        <>
            <Modal show={showCreateTableModal} onHide={handleCreateTableModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить стол</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='minBet'>
                            <Form.Label>Минимальная ставка, грн</Form.Label>
                            <Form.Control
                                type="text"
                                value={minBet}
                                onChange={e => handleMinBetChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='croupier'>
                            <Form.Label>Крупье</Form.Label>
                            <Select
                                id="croupier"
                                value={croupier}
                                onChange={handleCroupierSelect}
                                options={croupiers} />
                        </Form.Group>

                        <Form.Group controlId='game'>
                            <Form.Label>Игра</Form.Label>
                            <Select
                                id="game"
                                value={game}
                                onChange={handleGameSelect}
                                options={games} />
                        </Form.Group>

                        <Form.Group controlId='location'>
                            <Form.Label>Локация</Form.Label>
                            <Select
                                id="location"
                                value={location}
                                onChange={handleLocationSelect}
                                options={locations} />
                        </Form.Group>

                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateTableModalClose}>
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

export default CreateTableModal
