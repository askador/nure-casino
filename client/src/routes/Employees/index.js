import './index.scss'
import { Button } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip';
import getEmployees from '../../utils/api/get/getEmployees';
import { EmployeeModal, CreateEmployeeModal } from '../../components'
import { useEffect, useState } from 'react';

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showCreateEmployeeModal, setShowCreateEmployeeModal] = useState(false);
    const [employeeModal, setEmployeeModal] = useState({})
    
    const handleEmployeeModalClose = () => {
        setShowEmployeeModal(false)
        setEmployeeModal({})
      }
      const handleEmployeeModalShow = (employee) => {
        setEmployeeModal(employee)
        setShowEmployeeModal(true)
      }
    
      const openEmployeeModal = (employee) => {
        handleEmployeeModalShow(employee)
      }
    
    
      const handleCreateEmployeeModalClose = () => {
        setShowCreateEmployeeModal(false)
      }
      const handleCreateEmployeeModalShow = () => {
        setShowCreateEmployeeModal(true)
      }
      const openCreateEmployeeModal = () => {
        handleCreateEmployeeModalShow()
      }
    
    
      const handleCreateEmployee = () => {
        openCreateEmployeeModal()
      }


    useEffect(() => {
        getEmployees()
          .then(res => {
            setEmployees(res.data)
          })
          .catch(err => {
            alert(err.message)
          })
      }, [showCreateEmployeeModal, showEmployeeModal])

    return (
        <div className='employees'>
            <div className="functional">
                <a className="link_btn" data-tip data-event='click focus'>
                    Условия для сотрудника  
                </a>
                <ReactTooltip event='click' className='tooltip' place={'right'} effect='solid' getContent={() =>
                    <div>
                        - Зарплата целое число не меньше 0<br />
                        - Фото обязательно
                    </div>} />
                <Button variant="success" onClick={handleCreateEmployee}>Добавить сотрудника</Button>
            </div>

            <div className='tables-data'>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                            <th>Зарплата, грн.</th>
                            <th>Должность</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(
                            (employee, index) => {
                                return (
                                    <tr style={{ cursor: 'pointer' }} key={index} onClick={() => openEmployeeModal(employee)}>
                                        <td>{employee.id}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.middle_name}</td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.job.title}</td>
                                    </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </div>

      {showEmployeeModal ? <EmployeeModal employeeModal={employeeModal} employees={employees} showEmployeeModal={showEmployeeModal} handleEmployeeModalClose={handleEmployeeModalClose} /> : null}
      {showCreateEmployeeModal ? <CreateEmployeeModal handleCreateEmployeeModalClose={handleCreateEmployeeModalClose} showCreateEmployeeModal={showCreateEmployeeModal} /> : null}

        </div>
    )
}

export default Employees


