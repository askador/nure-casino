import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import './index.scss'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getPlayerBets, getTables } from '../../utils/api/get';

const PlayerBetsModal = ({ playerId, showPlayerBetsModal, handlePlayerBetsModalClose }) => {

    const [date, setDate] = useState(new Date());
    const [bets, setBets] = useState([])
    const [table, setTable] = useState({
        value: 1, label: "№1"
    })
    const [tables, setTables] = useState([])

    useEffect(() => {
        getTables()
            .then(res => {
                setTables(res.data.map((table) => {
                    return {
                        value: table.id,
                        label: `№${table.id}`
                    }
                }))
            })
    }, [table])

    useEffect(() => {
        getPlayerBets(playerId, date, table.value)
            .then(res => {
                if (!res.data) {
                    setBets([])
                    return
                }

                setBets(res.data)
            })
    }, [date, table])

    const handleDateChange = (date) => {
        setDate(date)
    }
    const handleTableSelect = (table) => {
        setTable(tables.find(x => x.value === table.value))
    }

    return (
        <>
            <Modal dialogClassName="table-stats" show={showPlayerBetsModal} onHide={handlePlayerBetsModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Ставки игрока №{playerId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col><span style={{ fontSize: "18px" }}>Выберите дату:</span>
                                <DatePicker inline dateFormat="dd/MM/yyyy" selected={date} onChange={handleDateChange} />

                                <Form>
                                    <Form.Group controlId='table'>
                                        <Form.Label>Стол</Form.Label>
                                        <Select
                                            id="table"
                                            value={table}
                                            onChange={handleTableSelect}
                                            options={tables} />
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col>
                                <div className="stats-section">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Стоимость</th>
                                                <th>Тип ставки</th>
                                                <th>Дата</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bets.map(
                                                (bet, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <td>{bet.id}</td>
                                                            <td>{bet.amount}</td>
                                                            <td>{bet.bet_type.label}</td>
                                                            <td>{bet.date}</td>
                                                        </tr>
                                                    )
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handlePlayerBetsModalClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PlayerBetsModal
