import './index.scss'
import { Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';
import getPlayers from '../../utils/api/get/getPlayers';
import { PlayerModal, CreatePlayerModal } from '../../components'
import { useEffect, useState } from 'react';

const Players = () => {
    const [players, setPlayers] = useState([])
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [showCreatePlayerModal, setShowCreatePlayerModal] = useState(false);
    const [playerModal, setPlayerModal] = useState({})
    
    const handlePlayerModalClose = () => {
        setShowPlayerModal(false)
        setPlayerModal({})
      }
      const handlePlayerModalShow = (player) => {
        setPlayerModal(player)
        setShowPlayerModal(true)
      }
    
      const openPlayerModal = (player) => {
        handlePlayerModalShow(player)
      }
    
    
      const handleCreatePlayerModalClose = () => {
        setShowCreatePlayerModal(false)
      }
      const handleCreatePlayerModalShow = () => {
        setShowCreatePlayerModal(true)
      }
      const openCreatePlayerModal = () => {
        handleCreatePlayerModalShow()
      }
    
    
      const handleCreatePlayer = () => {
        openCreatePlayerModal()
      }


    useEffect(() => {
        getPlayers()
          .then(res => {
            setPlayers(res.data)
          })
          .catch(err => {
            alert(err.message)
          })
      }, [showCreatePlayerModal, showPlayerModal])

    return (
        <div className='players'>
            <div className="functional">
                {/* <a className="link_btn" data-tip data-event='click focus'>
                    Условия для игрока  
                </a>
                <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
                    <div>
                        - Зарплата целое число не меньше 0<br />
                        - Фото обязательно
                    </div>} /> */}
                <Button variant="success" onClick={handleCreatePlayer}>Добавить игрока</Button>
            </div>

            <div className='tables-data'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                            <th>Капитал</th>
                            <th>Выиграно</th>
                            <th>Проиграно</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(
                            (player, index) => {
                                return (
                                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openPlayerModal(player)}>
                                        <td>{player.id}</td>
                                        <td>{player.name}</td>
                                        <td>{player.last_name}</td>
                                        <td>{player.middle_name}</td>
                                        <td>{player.money}</td>
                                        <td>{player.won}</td>
                                        <td>{player.lose}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>

      {showPlayerModal ? <PlayerModal playerModal={playerModal} players={players} showPlayerModal={showPlayerModal} handlePlayerModalClose={handlePlayerModalClose} /> : null}
      {showCreatePlayerModal ? <CreatePlayerModal handleCreatePlayerModalClose={handleCreatePlayerModalClose} showCreatePlayerModal={showCreatePlayerModal} /> : null}

        </div>
    )
}

export default Players


