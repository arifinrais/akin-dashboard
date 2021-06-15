import React, {useContext} from 'react';
//import {Link} from 'react-router-dom';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';

const AkinNavbar = props => {
    return(
        <Navbar bg="light" expand="lg">
            <Nav.Link href="/">
                <img src="/res/logo-2.png" width="101.81" height="45" alt="" />
            </Nav.Link>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="/explore">JELAJAHI</Nav.Link>
                    <NavDropdown alignRight title="DAERAH" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/region">Profil Daerah</NavDropdown.Item>
                        <NavDropdown.Item href="/ranking">Peringkat Daerah</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown alignRight title="PELAJARI" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/materials#data">Pengolahan Data</NavDropdown.Item>
                        <NavDropdown.Item href="/materials#rca">RCA</NavDropdown.Item>
                        <NavDropdown.Item href="/materials#network">Jejaring Bimodal</NavDropdown.Item>
                        <NavDropdown.Item href="/materials#reflection">Metode Refleksi</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/about">TENTANG</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AkinNavbar;