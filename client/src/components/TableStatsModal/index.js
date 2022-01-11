import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import './index.scss'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTableStats } from '../../utils/api/get';

const TableStatsModal = ({ tableId, showTableStatsModal, handleTableStatsModalClose }) => {

    const [date, setDate] = useState(new Date());
    const [profit, setProfit] = useState(0)
    const [loss, setLoss] = useState(0)
    const [playersAmount, setPlayersAmount] = useState(0)

    useEffect(() => {
        getTableStats(tableId, date)
            .then(res => {
                if(!res.data) {
                    setProfit("no data")
                    setLoss("no data")
                    setPlayersAmount("no data")
                    return
                }

                setProfit(res.data.profit)
                setLoss(res.data.loss)
                setPlayersAmount(res.data.players_amount)
            })
    }, [date])

    const handleDateChange = (date) => {
        setDate(date)
    }

    return (
        <>
            <Modal dialogClassName="table-stats" show={showTableStatsModal} onHide={handleTableStatsModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Статистика стола №{tableId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col><span style={{ fontSize: "18px" }}>Выберите дату:</span>
                                <DatePicker inline dateFormat="dd/MM/yyyy" selected={date} onChange={handleDateChange} />
                            </Col>
                            <Col><div className="stats-section-table">
                            <p className='profit'>Профит: {profit} грн.</p>
                            <p className='loss'>Убытки: {loss} грн.</p>
                            <p className='players-amount'>Количество игроков: {playersAmount}</p>
                    </div></Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleTableStatsModalClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TableStatsModal
