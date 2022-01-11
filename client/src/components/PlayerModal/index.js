import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import { updatePlayer } from '../../utils/api/put'
import { deletePlayer } from '../../utils/api/delete'
import './index.scss'
import PlayerBetsModal from '../PlayerBetsModal'
import { getPlayers } from '../../utils/api/get'

function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}

const PlayerModal = ({ playerModal, players, showPlayerModal, handlePlayerModalClose }) => {

    const [player, setPlayer] = useState(playerModal)
    const [tableId, setTableId] = useState('')
    const [name, setName] = useState(playerModal.name)
    const [lastName, setLastName] = useState(playerModal.last_name)
    const [middleName, setMiddleName] = useState(playerModal.middle_name)
    const [money, setMoney] = useState(playerModal.money)
    const [won, setWon] = useState(playerModal.won)
    const [lose, setLose] = useState(playerModal.lose)
    const [showPlayerBetsModal, setShowPlayerBetsModal] = useState(false);

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


    const handlePrevPlayer = () => {
        const currentPlayerPos = indexOf(players, player)
        setPlayer(players.at(currentPlayerPos - 1))
    }

    const handleNextPlayer = () => {
        try {
            const currentPlayerPos = indexOf(players, player)
            setPlayer(players.at(currentPlayerPos + 1))
        } catch (e) {
            setPlayer(players.at(0))
        }
    }

    const handlePlayerBetsModalClose = () => {
        setShowPlayerBetsModal(false)
    }
    const handlePlayerBetsModalShow = () => {
        setShowPlayerBetsModal(true)
    }

    const handleShowPlayerBets = () => {
        handlePlayerBetsModalShow()
    }

    useEffect(() => {
        setName(player.name)
        setLastName(player.last_name)
        setMiddleName(player.middle_name)
        setMoney(player.money)
        setWon(player.won)
        setLose(player.lose)

        getPlayers(player.id)
            .then(res => {
                setTableId(res.data.table[0]?.id)
            })

        return
    }, [player])



    const handleDeletePlayer = async () => {
        const res = await deletePlayer(player.id)

        alert(res.message)
        handlePlayerModalClose()
    }

    const handleSubmit = async () => {
        const res = await updatePlayer({
            id: player.id,
            name: name,
            lastName: lastName,
            middleName: middleName,
            money: money,
            won: won,
            lose: lose
        })

        alert(res.message)
        if ("error" in res) return
        handlePlayerModalClose()
    }

    return (
        <>
            <Modal dialogClassName="table-data players" show={showPlayerModal} onHide={handlePlayerModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Игрок №{player.id}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevPlayer}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextPlayer}
                        >&#x3e;</Button>
                    </div>

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

                    <Button variant="secondary" onClick={handleShowPlayerBets}>Ставки игрока</Button>
                    {
                    tableId && 
                        <span className='player-table'>Играет за столом №{tableId}</span>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDeletePlayer}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handlePlayerModalClose}>
                        Закрыть
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>

            {showPlayerBetsModal ? <PlayerBetsModal playerId={player.id} handlePlayerBetsModalClose={handlePlayerBetsModalClose} showPlayerBetsModal={showPlayerBetsModal} /> : null}

        </>
    )
}

export default PlayerModal
