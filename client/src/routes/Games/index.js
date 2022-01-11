import React from 'react'
import getGames from '../../utils/api/get/getGames';
import { useEffect, useState } from 'react'
import { GameModal, CreateGameModal } from '../../components'
import './index.scss'
import { Button } from 'react-bootstrap'


function Games() {

    const [games, setGames] = useState([])
    const [showGameModal, setShowGameModal] = useState(false);
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [gameModal, setGameModal] = useState({})



    const handleGameModalClose = () => {
        setShowGameModal(false)
        setGameModal({})
    }
    const handleGameModalShow = (game) => {
        setGameModal(game)
        setShowGameModal(true)
    }

    const openGameModal = (game) => {
        handleGameModalShow(game)
    }


    const handleCreateGameModalClose = () => {
        setShowCreateGameModal(false)
    }
    const handleCreateGameModalShow = () => {
        setShowCreateGameModal(true)
    }
    const openCreateGameModal = () => {
        handleCreateGameModalShow()
    }


    const handleCreateGame = () => {
        openCreateGameModal()
    }

    useEffect(() => {
        getGames()
            .then(res => {
                setGames(res.data)
            })
            .catch(err => {
                alert(err.message)
            })
        // setDecks(decksList)
    }, [showGameModal, showCreateGameModal])

    return (
        <div className='games'>
            <div className="functional">
                {/* <a className="link_btn" data-tip data-event='click focus'>
            Условия для Лока
          </a>
          <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
            <div>
              - Мимальная ставка целое число не меньше 0<br />
              - Нельзя ставить занятого крупье
            </div>} /> */}
                <Button variant="success" onClick={handleCreateGame}>Добавить игру</Button>
            </div>

            <div className='tables-data'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                        </tr>
                    </thead>
                    <tbody>

                        {games.map(
                            (game, index) => {
                                return (
                                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openGameModal(game)}>
                                        <td>{game.id}</td>
                                        <td>{game.title}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>


            {showGameModal ? <GameModal gameModal={gameModal} games={games} showGameModal={showGameModal} handleGameModalClose={handleGameModalClose} /> : null}
            {showCreateGameModal ? <CreateGameModal handleCreateGameModalClose={handleCreateGameModalClose} showCreateGameModal={showCreateGameModal} /> : null}

        </div>
    )
}

export default Games
