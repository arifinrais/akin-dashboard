import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import AkinViz from './AkinViz';
import AkinPanel from './AkinPanel';

const AkinDashboard = props => {
    return(
        <Container>
            <Row>
                <Col xs="8" sm="8" md="8" lg="8">
                    <Row>
                        <h2>Paten apa saja yang dihasilkan Jawa Barat pada tahun 2018?</h2>
                    </Row>
                    <Row>
                        <AkinViz />
                    </Row>
                    <Row>
                        <h2>CATEGORY</h2>
                    </Row>
                    <Row>
                        <h2>SLIDER</h2>
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