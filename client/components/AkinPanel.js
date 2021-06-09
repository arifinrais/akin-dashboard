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
                        <Dropdown.Toggle id="dropdown-basic">
                            Pilih tingkat daerah/jenis kekayaan intelektual
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Pilih kota/kabupaten/provinsi/kode IPC paten/kode NCL merek/kode CIP publikasi ilmiah
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
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