import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup } from 'react-bootstrap'
import Select from 'react-select'
import useTableModal from '../../hooks/useTableModal'
import { updateTable } from '../../utils/api/put'
import { deleteTable } from '../../utils/api/delete'
import './index.scss'
import { useHistory } from 'react-router-dom'
import TableStatsModal from '../TableStatsModal'

function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}


const TableModal = ({ tableModal, tables, showTableModal, handleTableModalClose }) => {

    const [table, setTable] = useState(tableModal)
    const [minBet, setMinBet] = useState(tableModal.min_bet)
    const [croupier, setCroupier] = useState({
        label: `${tableModal.croupier.name} ${tableModal.croupier.last_name} ${tableModal.croupier.middle_name}`,
        value: tableModal.croupier.id
    })
    const [game, setGame] = useState({
        value: tableModal.game.id, label: tableModal.game.title
    })
    const [location, setLocation] = useState({
        value: tableModal.location.id,
        label: tableModal.location.title
    })
    const history = useHistory();
    const [showTableStatsModal, setShowTableStatsModal] = useState(false);

    const { croupiers, games, locations } = useTableModal()


    const handleTableStatsModalClose = () => {
        setShowTableStatsModal(false)
    }
    const handleTableStatsModalShow = () => {
        setShowTableStatsModal(true)
    }

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

    const handlePrevTable = () => {
        const currentTablePos = indexOf(tables, table)
        setTable(tables.at(currentTablePos - 1))
    }

    const handleNextTable = () => {
        try {
            const currentTablePos = indexOf(tables, table)
            setTable(tables.at(currentTablePos + 1))
        } catch (e) {
            setTable(tables.at(0))
        }
    }

    const handleShowStats = () => {
        // let path = `http://localhost:3000/tables/stats?tableId=${1}`;
        // history.push(path);
        handleTableStatsModalShow()
    }


    useEffect(() => {
        setMinBet(table.min_bet)
        setCroupier(croupiers.find(x => x.value === table.croupier_id))
        setGame(games.find(x => x.value === table.game_id))
        setLocation(locations.find(x => x.value === table.location_id))

        return
    }, [table])



    const handleDeleteTable = async () => {
        const res = await deleteTable(table.id)

        alert(res.message)
        handleTableModalClose()
    }

    const handleSubmit = async () => {
        const res = await updateTable({
            id: table.id,
            min_bet: minBet,
            game_id: game?.value,
            location_id: location?.value,
            croupier_id: croupier?.value
        })

        alert(res.message)
        handleTableModalClose()
    }

    return (
        <>
            <Modal dialogClassName="table-data" show={showTableModal} onHide={handleTableModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Стол №{table.id}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevTable}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextTable}
                        >&#x3e;</Button>
                    </div>

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
                    <Button variant="secondary" onClick={handleShowStats}>Посмотреть статистику</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDeleteTable}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handleTableModalClose}>
                        Закрыть
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>

            {showTableStatsModal ? <TableStatsModal tableId={table.id} handleTableStatsModalClose={handleTableStatsModalClose} showTableStatsModal={showTableStatsModal} /> : null}

        </>
    )
}

export default TableModal
