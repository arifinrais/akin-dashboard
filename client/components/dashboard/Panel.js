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
import Resources from '../../../server/providers/resourceProvider';
import MenuItem from '@material-ui/core/MenuItem';

const AkinPanel = props => {
    //const [alignment, setAlignment] = React.useState("left");
    //var { isLoaded, vtype, focus, reg_dimension, ipr_dimension, code } = props;
    var code_options = {};
    var isFnDSelected = false;

    const handleFocus = (ev, newFocus) => {
        props.updateFocus(newFocus);
    };

    const handleRegDim = (ev, newRegDim) => {
        props.updateRegDim(newRegDim.props.value);
    };

    const handleIprDim = (ev, newIprDim) => {
        props.updateIprDim(newIprDim.props.value);
    };

    const handleCode = (ev, newCode) => {
        props.updateCode(newCode.props.value);
    };

    const updateOptions = () => {
        isFnDSelected = props.focus !== '' && props.reg_dimension !== '' && props.ipr_dimension !== '';
        if (isFnDSelected) {
            getOptions();
        }
    }

    const getOptions = () => {
        if (props.focus == "reg") {
            if (props.reg_dimension == "prov") {
                code_options = Resources.ProvinceCode;
            } else if (props.reg_dimension == "city") {
                code_options = Resources.CityCode;
            }
        } else if (props.focus == "ipr") {
            if (props.ipr_dimension == "ptn") {
                code_options = Resources.PatentCode;
            } else if (props.ipr_dimension == "trd") {
                code_options = {};
            } else if (props.ipr_dimension == "pub") {
                code_options = {};
            }
        }
    };

    updateOptions();
    return(
        <Container>
            <Row>
                <h4>PENGATURAN</h4>
            </Row>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item> 
                    <ToggleButtonGroup
                        value={props.focus}
                        exclusive
                        onChange={handleFocus}
                        aria-label="viz-focus"
                    >
                        <ToggleButton size="small" value="reg" aria-label="reg">
                            &nbsp;&nbsp;&nbsp;&nbsp;DAERAH&nbsp;&nbsp;&nbsp;&nbsp;
                        </ToggleButton>
                        <ToggleButton size="small" value="ipr" aria-label="ipr">
                            KEKAYAAN<br/>INTELEKTUAL
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <FormControl /*className={classes.formControl}*/>
                        <Select
                        value={props.reg_dimension}
                        onChange={handleRegDim}
                        /*className={classes.selectEmpty}*/
                        >
                            <MenuItem value={""}>Tingkat Daerah</MenuItem>
                            <MenuItem value={"prov"}>Provinsi</MenuItem>
                            <MenuItem value={"city"}>Kabupaten/Kota</MenuItem>
                        </Select>
                    </FormControl>
                    &nbsp;&nbsp;
                    <FormControl /*className={classes.formControl}*/>
                        <Select
                        value={props.ipr_dimension}
                        onChange={handleIprDim}
                        /*className={classes.selectEmpty}*/
                        >
                            <MenuItem value={""}>Jenis KI&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</MenuItem>
                            <MenuItem value={"ptn"}>Paten</MenuItem>
                            <MenuItem disabled value={"pub"}>Publikasi Ilmiah (WIP)</MenuItem>
                            <MenuItem disabled value={"trd"}>Merek Dagang (WIP)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                    <FormControl /*className={classes.formControl}*/>
                        <Select
                        value={props.code}
                        onChange={handleCode}
                        /*className={classes.selectEmpty}*/
                        >
                            {isFnDSelected? Object.keys(code_options).map((key) => ( 
                                <MenuItem value={key}>{code_options[key]}</MenuItem> ))
                                : <MenuItem value={""}>Please Select Focus and Dimension</MenuItem>}
                        </Select>
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