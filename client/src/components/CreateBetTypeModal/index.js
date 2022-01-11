import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { createBetType } from '../../utils/api/post'
import './index.scss'
import Select from 'react-select'
import { getGames } from '../../utils/api/get'

const CreateBetTypeModal = ({showCreateBetTypeModal, handleCreateBetTypeModalClose}) => {

    const [label, setLabel] = useState('')
    const [game, setGame] = useState({})
    const [games, setGames] = useState([])

    useEffect(()=> {
        getGames()
        .then(res => {
          setGames(res.data.map((game) => {
            return {
              value: game.id,
              label: game.title
            }
          }))
        })
        .catch(err => {
          alert(`${err.message}. Can't get games`)
        })
    }, [])

    const handleLabelChange = (value) => {
        setLabel(value)
    }
    const handleGameSelect = (option) => {
        setGame(games.find(x => x.value === option.value))
    }

    const handleSubmit = async () => {
        const res = await createBetType({
            label: label,
            gameId: game?.value
        })

        alert(res.message)
        handleCreateBetTypeModalClose()
    }



    return (
        <>
             <Modal show={showCreateBetTypeModal} onHide={handleCreateBetTypeModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить ставку</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='label'>
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                value={label}
                                onChange={e => handleLabelChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId='game'>
                            <Form.Label>Игра</Form.Label>
                            <Select
                                id="game"
                                value={game}
                                onChange={handleGameSelect}
                                options={games} />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateBetTypeModalClose}>
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

export default CreateBetTypeModal
