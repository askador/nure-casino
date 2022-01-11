import { useEffect, useState } from 'react'
import { getTables } from '../../utils/api/get'
import { TableModal, CreateTableModal } from '../../components'
import './index.scss'
import { Button, Row, Container } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';



const Tables = () => {
  const [tables, setTables] = useState([])
  const [showTableModal, setShowTableModal] = useState(false);
  const [showCreateTableModal, setShowCreateTableModal] = useState(false);
  const [tableModal, setTableModal] = useState({})



  const handleTableModalClose = () => {
    setShowTableModal(false)
    setTableModal({})
  }
  const handleTableModalShow = (table) => {
    setTableModal(table)
    setShowTableModal(true)
  }

  const openTableModal = (table) => {
    handleTableModalShow(table)
  }


  const handleCreateTableModalClose = () => {
    setShowCreateTableModal(false)
  }
  const handleCreateTableModalShow = () => {
    setShowCreateTableModal(true)
  }
  const openCreateTableModal = () => {
    handleCreateTableModalShow()
  }


  const handleCreateTable = () => {
    openCreateTableModal()
  }

  useEffect(() => {
    getTables()
      .then(res => {
        setTables(res.data)
      })
      .catch(err => {
        alert(err.message)
      })
    // setDecks(decksList)
  }, [showTableModal, showCreateTableModal])

  return (
    <div className='tables'>
      <div className="functional">
        <a className="link_btn" data-tip data-event='click focus'>
          Условия для стола
        </a>
        <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
          <div>
            - Мимальная ставка целое число не меньше 0<br />
            - Нельзя ставить занятого крупье
          </div>} />
        <Button variant="success" onClick={handleCreateTable}>Добавить стол</Button>
      </div>

      <div className='tables-data'>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Минимальная ставка, грн</th>
              <th>Игра</th>
              <th>Локация</th>
              <th>Крупье</th>
            </tr>
          </thead>
          <tbody>

            {tables.map(
              (table, index) => {
                return (
                  <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openTableModal(table)}>
                    <td>{table.id}</td>
                    <td>{table.min_bet}</td>
                    <td>{table.game.title}</td>
                    <td>{table.location.title}</td>
                    <td>{`${table.croupier.name} ${table.croupier.last_name} ${table.croupier.middle_name}`}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>


      {showTableModal ? <TableModal tableModal={tableModal} tables={tables} showTableModal={showTableModal} handleTableModalClose={handleTableModalClose} /> : null}
      {showCreateTableModal ? <CreateTableModal handleCreateTableModalClose={handleCreateTableModalClose} showCreateTableModal={showCreateTableModal} /> : null}

    </div>
  )
}

export default Tables