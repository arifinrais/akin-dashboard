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
//console.log(props);

    const handleFocus = (ev, newFocus) => {
        //console.log(newFocus);
        console.log(newFocus);
        props.updateFocus(newFocus);
        getOptions();
    };

    const handleRegDim = (ev, newRegDim) => {
        //console.log(newFocus);
        console.log(newRegDim.props.value);
        props.updateRegDim(newRegDim.props.value);
        getOptions();
    };

    const handleIprDim = (ev, newIprDim) => {
        //console.log(newFocus);
        console.log(newIprDim.props.value);
        props.updateIprDim(newIprDim.props.value);
        getOptions();
        console.log(props.focus);
        console.log(props.reg_dimension);
        console.log(props.ipr_dimension);
    };

    const handleCode = (ev, newCode) => {
        //console.log(newFocus);
        props.updateCode(newCode);
    };

    /*const jsonToDict = (jsonObject) => {
        var temp = {};
        var data = jsonObject;
        for (var key in data) {
            temp[key] = data[key];
        }
        return temp;
    }*/

    const getOptions = () => {
        if (props.focus == "reg") {
            if (props.reg_dimension == "prov") {
                //console.log('masuk ga');
                //code_options = jsonToDict(Resources.ProvinceCode);
                code_options = Resources.ProvinceCode;
                console.log(code_options);
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
        console.log(typeof code_options);
        if (Object.keys(code_options).length === 0) {
            return(<MenuItem value={""}>Please Select Focus and Dimension</MenuItem>);
        } else {
            let itemList = []
            for (var [key, value] of Object.entries(code_options)) {
                itemList.push(<MenuItem value={key}>{value}</MenuItem>);
            }
            /*itemList = code_options.map((key,value)=> {
                itemList.push(<MenuItem value={key}>{value}</MenuItem>);
            })*/
            console.log(itemList);
            return itemList;
        }
    };

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
                            <MenuItem value={"pub"}>Publikasi Ilmiah</MenuItem>
                            <MenuItem value={"trd"}>Merek Dagang</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                    <FormControl /*className={classes.formControl}*/>
                        <NativeSelect
                        value={props.code}
                        onChange={handleCode}
                        /*className={classes.selectEmpty}*/
                        >
                            {getOptions()}
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