import { useEffect, useState } from 'react'
import { getBets } from '../../utils/api/get'
import { CreateBetModal } from '../../components'
import './index.scss'
import { Button, Row, Container } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';



const Bets = () => {
  const [bets, setBets] = useState([])
  const [showBetModal, setShowBetModal] = useState(false);
  const [showCreateBetModal, setShowCreateBetModal] = useState(false);
  const [betModal, setBetModal] = useState({})



  const handleBetModalClose = () => {
    setShowBetModal(false)
    setBetModal({})
  }
  const handleBetModalShow = (bet) => {
    setBetModal(bet)
    setShowBetModal(true)
  }

  const openBetModal = (bet) => {
    // handleBetModalShow(bet)
  }


  const handleCreateBetModalClose = () => {
    setShowCreateBetModal(false)
  }
  const handleCreateBetModalShow = () => {
    setShowCreateBetModal(true)
  }
  const openCreateBetModal = () => {
    handleCreateBetModalShow()
  }


  const handleCreateBet = () => {
    openCreateBetModal()
  }

  useEffect(() => {
    getBets()
      .then(res => {
        setBets(res.data)
      })
      .catch(err => {
        alert(err.message)
      })
    // setDecks(decksList)
  }, [showCreateBetModal])

  return (
    <div className='bets'>
      <div className="functional">
        {/* <a className="link_btn" data-tip data-event='click focus'>
          Условия для стола
        </a>
        <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
          <div>
            - Мимальная ставка целое число не меньше 0<br />
            - Нельзя ставить занятого крупье
          </div>} /> */}
        <Button variant="success" onClick={handleCreateBet}>Добавить ставку</Button>
      </div>

      <div className='tables-data'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Стоимость</th>
              <th>Тип ставки</th>
              <th>Игрок</th>
              <th>Стол</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>

            {bets.map(
              (bet, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openBetModal(bet)}>
                    <td>{bet.id}</td>
                    <td>{bet.amount}</td>
                    <td>{bet.bet_type.label}</td>
                    <td>{`${bet.player.name} ${bet.player.last_name} ${bet.player.middle_name}`}<br/>
                        {`(№${bet.player_id})`}</td>
                    <td>{bet.table_id}</td>
                    <td>{bet.date}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>


      {/* {showBetModal ? <BetModal betModal={betModal} bets={bets} showBetModal={showBetModal} handleBetModalClose={handleBetModalClose} /> : null} */}
      {showCreateBetModal ? <CreateBetModal handleCreateBetModalClose={handleCreateBetModalClose} showCreateBetModal={showCreateBetModal} /> : null}

    </div>
  )
}

export default Bets