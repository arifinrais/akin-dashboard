import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import AkinViz from './AkinViz';
import AkinPanel from './AkinPanel';

const AkinDashboard = props => {
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <AkinViz />
                </Col>
                <Col xs lg="2">
                    <AkinPanel />
                </Col>
            </Row>
        </Container>
    )
}

export default AkinDashboard;