import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { updateGame } from '../../utils/api/put'
import { deleteGame } from '../../utils/api/delete'
import './index.scss'


function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}

function GameModal({gameModal, games, showGameModal, handleGameModalClose}) {

    const [game, setGame] = useState(gameModal)
    const [title, setTitle] = useState(gameModal.title)


    const handleTitleChange = (value) => {
        setTitle(value)
    }

    const handlePrevGame = () => {
        const currentGamePos = indexOf(games, game)
        setGame(games.at(currentGamePos - 1))
    }

    const handleNextGame = () => {
        try {
            const currentGamePos = indexOf(games, game)
            setGame(games.at(currentGamePos + 1))
        } catch (e) {
            setGame(games.at(0))
        }
    }

    useEffect(() => {
        setTitle(game.title)

        return
    }, [game])

    const handleDeleteGame = async () => {
        const res = await deleteGame(game.id)

        alert(res.message)
        handleGameModalClose()
    }

    const handleSubmit = async () => {
        const res = await updateGame({
            id: game.id,
            title: title,
        })

        alert(res.message)
        handleGameModalClose()
    }



    return (
        <>
             <Modal show={showGameModal} onHide={handleGameModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Игра {game.title}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevGame}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextGame}
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
                    <Button variant='danger' onClick={handleDeleteGame}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handleGameModalClose}>
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

export default GameModal
