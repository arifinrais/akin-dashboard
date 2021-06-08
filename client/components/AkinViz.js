import React from 'react';
import {Container} from 'react-bootstrap';

const AkinDashboard = props => {
    return(
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto"><AkinViz /></Col>
                <Col xs lg="2">
                    <AkinPanel />
                </Col>
            </Row>
        </Container>
    )
}

export default AkinDashboard;