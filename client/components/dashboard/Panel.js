import React from 'react';
import {Container, Row, Col, Button, Dropdown} from 'react-bootstrap';
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const AkinPanel = props => {
    const [alignment, setAlignment] = React.useState("left");

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return(
        <Container>
            <Row>
                <h4>PENGATURAN</h4>
            </Row>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item> 
                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton size="small" value="justify" aria-label="reg">
                            &nbsp;&nbsp;&nbsp;&nbsp;DAERAH&nbsp;&nbsp;&nbsp;&nbsp;
                        </ToggleButton>
                        <ToggleButton size="small" value="center" aria-label="ipr">
                            KEKAYAAN<br/>INTELEKTUAL
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <FormControl /*className={classes.formControl}*/>
                        <NativeSelect
                        /*value={state.age}
                        onChange={handleChange}
                        name="age"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}*/
                        >
                            <option value="">Tingkat Daerah</option>
                            <option value="prov">Provinsi</option>
                            <option value="city">Kabupaten/Kota</option>
                        </NativeSelect>
                    </FormControl>
                    &nbsp;&nbsp;
                    <FormControl /*className={classes.formControl}*/>
                        <NativeSelect
                        /*value={state.age}
                        onChange={handleChange}
                        name="age"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}*/
                        >
                            <option value="">Jenis KI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                            <option value="ptn">Paten</option>
                            <option value="pub">Publikasi Ilmiah</option>
                            <option value="trd">Merek Dagang</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                    <FormControl /*className={classes.formControl}*/>
                        <NativeSelect
                        /*value={state.age}
                        onChange={handleChange}
                        name="age"
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'age' }}
                        Pilih kota/kabupaten/provinsi/kode IPC paten/kode NCL merek/kode CIP publikasi ilmiah*/
                        >
                            <option value="">Provinsi</option>
                            <option value="12">Jawa Barat</option>
                            <option value="13">Jawa Tengah</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
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