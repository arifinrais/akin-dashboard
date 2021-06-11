import React from 'react';
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap';

const AkinPanel = props => {
    return(
        <Container>
            <Row>
                <h4>PENGATURAN</h4>
            </Row>
            <Row>
                <Col>
                    <Button>
                        DAERAH
                    </Button>
                </Col>
                <Col>
                    <Button>
                        KEKAYAAN INTELEKTUAL
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Pilih tingkat daerah
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Provinsi</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Kota/Kabupaten</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            Pilih jenis kekayaan intelektual
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-3">Paten</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Merek Dagang</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Publikasi Ilmiah</Dropdown.Item>
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
                            <Dropdown.Item href="#/action-1">Jawa Barat</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Jawa Tengah</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Jawa Timur</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <h4>TIPE VISUALISASI</h4>
            </Row>
            <Row>
                <h6>VISUALISASI PATEN</h6>
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
                <Col>
                    <Button>
                        National Share
                    </Button>
                </Col>
            </Row>
            <Row>
                <h6>VISUALISASI KOMPLEKSITAS</h6>
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