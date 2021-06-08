import React from 'react';
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap';

const AkinPanel = props => {
    return(
        <Container>
            <Row>
                <h3>PENGATURAN</h3>
            </Row>
            <Row>
                <Col>
                    <Button>
                        DAERAH
                    </Button>
                </Col>
                <Col>
                    <Button>
                        KI
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Dropdown>
                        TINGKAT
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        JENIS KI
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Dropdown>
                        Pilih Daerah
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        Pilih KI
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <h3>TIPE VISUALISASI</h3>
            </Row>
            <Row>
                <Col>
                    <Button>
                        Tree Map
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Geo Map
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>
                        Over Time
                    </Button>
                </Col>
                <Col>
                    <Button>
                        National Share
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>
                        Ruang KI
                    </Button>
                </Col>
                <Col>
                    <Button>
                        Ring Chart
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default AkinPanel;