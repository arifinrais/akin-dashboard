import React, {useContext} from 'react';
//import {Link} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

const NavBar = props => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Nav.Link href="/">
                <img src="/res/logo-light.png" width="101.81" height="45" alt="" />
            </Nav.Link>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" >
                    <Nav.Link href="/explore">JELAJAHI</Nav.Link>
                    <NavDropdown alignRight title="DAERAH" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/regions">Profil Daerah</NavDropdown.Item>
                        <NavDropdown.Item href="/rankings">Peringkat Daerah</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown alignRight title="DATA" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/data#source">Sumber</NavDropdown.Item>
                        <NavDropdown.Item href="/data#processing">Pengolahan</NavDropdown.Item>
                        <NavDropdown.Item href="/data#analysis">Analisis</NavDropdown.Item>
                        <NavDropdown.Item href="/data#visualization">Visualisasi</NavDropdown.Item>
                        <NavDropdown.Item href="/data#download">Unduh</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/about">TENTANG</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;