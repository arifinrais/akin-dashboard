import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import AkinPanel from './Panel';

const AkinDashboard = props => {
    return(
        <Container>
            <Row>
                <Col xs="8" sm="8" md="8" lg="8">
                    <Row>
                        <h3>Paten apa saja yang dihasilkan Jawa Barat pada tahun 2018?</h3>
                    </Row>
                    <Row>
                        <Visualization />
                    </Row>
                    <Row>
                        <h2>CATEGORY</h2>
                    </Row>
                    <Row>
                        <Slider />
                    </Row>
                </Col>
                <Col xs="4" sm="4" md="4" lg="4">
                    <AkinPanel />
                </Col>
            </Row>
        </Container>
    )
}

export default AkinDashboard;