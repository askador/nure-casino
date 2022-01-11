import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import Select from 'react-select'
import useBetModal from '../../hooks/useBetModal'
import useBetTypes from '../../hooks/useBetTypes'
import { getBetsTypesByGameID, getGames, getTables } from '../../utils/api/get'
import {createBet} from '../../utils/api/post'
import './index.scss'

const CreateBetModal = ({ showCreateBetModal, handleCreateBetModalClose }) => {
    const [amount, setAmount] = useState(0)
    const [table, setTable] = useState({ value: 1, label: '№1' })
    const [betType, setBetType] = useState({})
    const [player, setPlayer] = useState({})
    const [betTypes, setBetTypes] = useState([])
    const [gameTitle, setGameTitle] = useState('')

    const { tables, players } = useBetModal()

    useEffect(() => {
        getTables(table.value)
            .then(res => {
                getGames(res.data.game_id)
                    .then(res => setGameTitle(res.data.title))

                // setGameTitle(res.data.game.title)
                getBetsTypesByGameID(res.data.game_id)
                    .then(res => {


                        let bets_types = res.data[0].bets_types
                        setBetTypes(bets_types.map((bet_type) => {
                            return {
                                value: bet_type.id,
                                label: bet_type.label
                            }
                        }))
                    })
            })

        return
    }, [table])

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }
    const handleTableSelect = (option) => {
        setTable(tables.find(x => x.value === option.value))
    }
    const handlePlayerSelect = (option) => {
        setPlayer(players.find(x => x.value === option.value))
    }
    const handleBetTypeSelect = (option) => {
        try {
            setBetType(betTypes.find(x => x.value === option.value))
        }
        catch (e) { }
    }

    const handleSubmit = async () => {
        const res = await createBet({
            amount: amount,
            betTypeId: betType?.value,
            playerId: player?.value,
            tableId: table?.value
        })

        alert(res.message)

        if ("error" in res) return
        handleCreateBetModalClose()
    }


    return (
        <>
            <Modal show={showCreateBetModal} onHide={handleCreateBetModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить ставку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='amount'>
                            <Form.Label>Стоимость</Form.Label>
                            <Form.Control
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='table'>
                            <Form.Label>Стол</Form.Label>
                            <Select
                                id="table"
                                value={table}
                                onChange={handleTableSelect}
                                options={tables} />
                        </Form.Group>

                        <span className='game-title'>Игра: {gameTitle}</span><br/><br/>

                        <Form.Group controlId='bet-type'>
                            <Form.Label>Тип ставки</Form.Label>
                            <Select
                                id="croupier"
                                value={betType}
                                onChange={handleBetTypeSelect}
                                options={betTypes} />
                        </Form.Group>

                        <Form.Group controlId='player'>
                            <Form.Label>Игрок</Form.Label>
                            <Select
                                id="player"
                                value={player}
                                onChange={handlePlayerSelect}
                                options={players} />
                        </Form.Group>


                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateBetModalClose}>
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

export default CreateBetModal
