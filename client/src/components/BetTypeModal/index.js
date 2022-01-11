import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import { updateBetType } from '../../utils/api/put'
import { deleteBetType } from '../../utils/api/delete'
import './index.scss'
import Select from 'react-select'
import { getGames } from '../../utils/api/get'


function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}

const BetTypeModal = ({betTypeModal, betTypes, showBetTypeModal, handleBetTypeModalClose}) => {

    const [betType, setBetType] = useState(betTypeModal)
    const [label, setLabel] = useState(betTypeModal.label)
    const [game, setGame] = useState({
        value: betTypeModal.games[0]?.id, label: betTypeModal.games[0]?.title
    })
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

    const handlePrevBetType = () => {
        const currentBetTypePos = indexOf(betTypes, betType)
        setBetType(betTypes.at(currentBetTypePos - 1))
    }

    const handleNextBetType = () => {
        try {
            const currentBetTypePos = indexOf(betTypes, betType)
            setBetType(betTypes.at(currentBetTypePos + 1))
        } catch (e) {
            setBetType(betTypes.at(0))
        }
    }

    useEffect(() => {
        setLabel(betType.label)
        setGame(games.find(x => x.value === betType.games[0]?.id))

        return
    }, [betType])


    const handleDeleteBetType = async () => {
        const res = await deleteBetType(betType.id)

        alert(res.message)
        handleBetTypeModalClose()
    }

    const handleSubmit = async () => {
        const res = await updateBetType({
            id: betType.id,
            label: label,
        })

        alert(res.message)
        handleBetTypeModalClose()
    }



    return (
        <>
             <Modal show={showBetTypeModal} onHide={handleBetTypeModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Ставка {betType.label}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevBetType}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextBetType}
                        >&#x3e;</Button>
                    </div>
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
                    <Button variant='danger' onClick={handleDeleteBetType}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handleBetTypeModalClose}>
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

export default BetTypeModal
