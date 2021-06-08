import React from 'react';
import {Button, Dropdown} from 'react-bootstrap';

const AkinPanel = props => {
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

export default AkinPanel;