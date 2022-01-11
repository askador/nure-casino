import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import useEmployeeModal from '../../hooks/useEmployeeModal'
import { createEmployee } from '../../utils/api/post'
import './index.scss'

const CreateEmployeeModal = ({ showCreateEmployeeModal, handleCreateEmployeeModalClose }) => {
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [salary, setSalary] = useState(0)
    const [photo, setPhoto] = useState(null)
    const [job, setJob] = useState({})

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

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('lastName', lastName)
        formData.append('middleName', middleName)
        formData.append('salary', salary)
        formData.append('jobId', job?.value)
        formData.append('photo', photo)
        const res = await createEmployee(formData)

        alert(res.message)
        if ("error" in res) return 
        handleCreateEmployeeModalClose()
    }


    return (
        <>
            <Modal show={showCreateEmployeeModal} onHide={handleCreateEmployeeModalClose} animation={true} centered>
                <Modal.Header>
                    <Modal.Title>Добавить сотрудника</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateEmployeeModalClose}>
                        Закрыть
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateEmployeeModal
