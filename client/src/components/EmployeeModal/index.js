import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, FormControl, ButtonGroup, Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import useEmployeeModal from '../../hooks/useEmployeeModal'
import { updateEmployee } from '../../utils/api/put'
import { deleteEmployee } from '../../utils/api/delete'
import './index.scss'

function indexOf(array, object) {
    for (var i = 0; i < array.length - 1; i++) {
        if (array[i].id == object.id) {
            return i;
        }
    }
    return -1;
}

const imagesUrl = "http://localhost:8080/"

const EmployeeModal = ({ employeeModal, employees, showEmployeeModal, handleEmployeeModalClose }) => {

    const [employee, setEmployee] = useState(employeeModal)
    const [name, setName] = useState(employeeModal.name)
    const [lastName, setLastName] = useState(employeeModal.last_name)
    const [middleName, setMiddleName] = useState(employeeModal.middle_name)
    const [salary, setSalary] = useState(employeeModal.salary)
    const [photo, setPhoto] = useState(null)
    const [job, setJob] = useState({
        value: employeeModal.job.id, label: employeeModal.job.title
    })

    const { jobs } = useEmployeeModal()


    const handleNameChange = (value) => {
        setName(value)
    }
    const handleLastNameChange = (value) => {
        setLastName(value)
    }
    const handleMiddleNameChange = (value) => {
        setMiddleName(value)
    }
    const handleSalaryChange = (value) => {
        setSalary(value)
    }
    const handleJobSelect = (option) => {
        setJob(jobs.find(x => x.value === option.value))
    }
    const handlePhoto = e => {
        setPhoto(e.target.files[0])
    }


    const handlePrevEmployee = () => {
        const currentEmployeePos = indexOf(employees, employee)
        setEmployee(employees.at(currentEmployeePos - 1))
    }

    const handleNextEmployee = () => {
        try {
            const currentEmployeePos = indexOf(employees, employee)
            setEmployee(employees.at(currentEmployeePos + 1))
        } catch (e) {
            setEmployee(employees.at(0))
        }
    }



    useEffect(() => {
        setName(employee.name)
        setLastName(employee.last_name)
        setMiddleName(employee.middle_name)
        setSalary(employee.salary)
        setJob(jobs.find(x => x.value === employee.job_id))

        return
    }, [employee])



    const handleDeleteEmployee = async () => {
        const res = await deleteEmployee(employee.id)

        alert(res.message)
        handleEmployeeModalClose()
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('last_name', lastName)
        formData.append('middle_name', middleName)
        formData.append('salary', salary)
        formData.append('job_id', job?.value)
        formData.append('photo', photo)
        const res = await updateEmployee(employee.id, formData)

        alert(res.message)
        handleEmployeeModalClose()
    }

    return (
        <>
            <Modal dialogClassName="table-data employees" show={showEmployeeModal} onHide={handleEmployeeModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Сотрудник №{employee.id}</Modal.Title>
                    <div className='button-group'>
                        <Button
                            variant="secondary"
                            id="prev"
                            onClick={handlePrevEmployee}
                        >&#x3c;</Button>
                        <Button
                            variant="secondary"
                            id="next"
                            onClick={handleNextEmployee}
                        >&#x3e;</Button>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col sm={8}>
                                <Form onSubmit={handleSubmit}>

                                    <Form.Group controlId='name'>
                                        <Form.Label>Имя</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={name}
                                            onChange={e => handleNameChange(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='last-name'>
                                        <Form.Label>Фамилия</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={lastName}
                                            onChange={e => handleLastNameChange(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='middle-name'>
                                        <Form.Label>Отчество</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={middleName}
                                            onChange={e => handleMiddleNameChange(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='salary'>
                                        <Form.Label>Зарплата</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={salary}
                                            onChange={e => handleSalaryChange(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='job'>
                                        <Form.Label>Должность</Form.Label>
                                        <Select
                                            id="job"
                                            value={job}
                                            onChange={handleJobSelect}
                                            options={jobs} />
                                    </Form.Group>



                                    <Form.Group controlId='job'>
                                        <Form.Label>Фото</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={handlePhoto}
                                        />
                                    </Form.Group>

                                </Form>
                            </Col>
                            <Col sm={4}>
                                <div className='employee-photo'>
                                    <img src={imagesUrl + employee.photo} />
                                </div>
                            </Col>
                        </Row>
                    </Container>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleDeleteEmployee}>
                        Удалить запись
                    </Button>
                    <Button variant="secondary" onClick={handleEmployeeModalClose}>
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

export default EmployeeModal
