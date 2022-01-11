import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import routes from '../../routes'
import './index.scss'


const NavBar = () => {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white', fontSize: "28px", textDecoration: 'none'}} to='/'>NureCasino</NavLink>
                <Nav className="ml-auto" style={{color: 'white'}}>
                    {routes.map(({ path, title }, index) => {
                        return (
                            <NavLink style={{color:'white', textDecoration: 'none', marginLeft: '10px'}} to={path} exact key={index}>{title}</NavLink>
                        )
                    })}
                </Nav>
            </Container>    
        </Navbar>
    )
}

export default NavBar
