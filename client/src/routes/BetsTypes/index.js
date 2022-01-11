import React from 'react'
import {getBetsTypes} from '../../utils/api/get';
import { useEffect, useState } from 'react'
import { BetTypeModal, CreateBetTypeModal } from '../../components'
import './index.scss'
import { Button } from 'react-bootstrap'


function BetTypes() {

    const [betTypes, setBetTypes] = useState([])
    const [showBetTypeModal, setShowBetTypeModal] = useState(false);
    const [showCreateBetTypeModal, setShowCreateBetTypeModal] = useState(false);
    const [betTypeModal, setBetTypeModal] = useState({})



    const handleBetTypeModalClose = () => {
        setShowBetTypeModal(false)
        setBetTypeModal({})
    }
    const handleBetTypeModalShow = (betType) => {
        setBetTypeModal(betType)
        setShowBetTypeModal(true)
    }

    const openBetTypeModal = (betType) => {
        handleBetTypeModalShow(betType)
    }


    const handleCreateBetTypeModalClose = () => {
        setShowCreateBetTypeModal(false)
    }
    const handleCreateBetTypeModalShow = () => {
        setShowCreateBetTypeModal(true)
    }
    const openCreateBetTypeModal = () => {
        handleCreateBetTypeModalShow()
    }


    const handleCreateBetType = () => {
        openCreateBetTypeModal()
    }

    useEffect(() => {
        getBetsTypes()
            .then(res => {
                setBetTypes(res.data)
            })
            .catch(err => {
                alert(err.message)
            })
        // setDecks(decksList)
    }, [showBetTypeModal, showCreateBetTypeModal])

    return (
        <div className='betTypes'>
            <div className="functional">
                {/* <a className="link_btn" data-tip data-event='click focus'>
            Условия для Лока
          </a>
          <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
            <div>
              - Мимальная ставка целое число не меньше 0<br />
              - Нельзя ставить занятого крупье
            </div>} /> */}
                <Button variant="success" onClick={handleCreateBetType}>Добавить тип ставки</Button>
            </div>

            <div className='tables-data'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Игра</th>
                        </tr>
                    </thead>
                    <tbody>

                        {betTypes.map(
                            (betType, index) => {
                                return (
                                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openBetTypeModal(betType)}>
                                        <td>{betType.id}</td>
                                        <td>{betType.label}</td>
                                        <td>{betType.games[0]?.title}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>


            {showBetTypeModal ? <BetTypeModal betTypeModal={betTypeModal} betTypes={betTypes} showBetTypeModal={showBetTypeModal} handleBetTypeModalClose={handleBetTypeModalClose} /> : null}
            {showCreateBetTypeModal ? <CreateBetTypeModal handleCreateBetTypeModalClose={handleCreateBetTypeModalClose} showCreateBetTypeModal={showCreateBetTypeModal} /> : null}

        </div>
    )
}

export default BetTypes
