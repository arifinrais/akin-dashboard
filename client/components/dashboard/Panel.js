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
import Box from '@material-ui/core/Box';
import { borderColor } from 'polished';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    maxWidth: '70px', 
    maxHeight: '70px', 
    minWidth: '70px', 
    minHeight: '70px',
    border: '1px solid grey',
    backgroundColor: 'white',
    color: 'grey',
    padding: '5px 5px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  selectedButton: {margin: theme.spacing(1),
    maxWidth: '70px', 
    maxHeight: '70px', 
    minWidth: '70px', 
    minHeight: '70px',
    border: '1px solid black',
    backgroundColor: '#dedede',
    color: '#blac',
    padding: '5px 5px',
    fontSize: '12px',
    cursor: 'pointer',
  }
}));

const AkinPanel = props => {
    //const [alignment, setAlignment] = React.useState("left");
    //var { isLoaded, vtype, focus, reg_dimension, ipr_dimension, code } = props;
    const classes = useStyles();
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

    const handleVtype = (ev) => {
        props.updateVtype(ev.currentTarget.value);
    }

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
        <Box
            display="flex"
            flexWrap="wrap"
            alignContent="space-between"
            p={2}
            m={1}
            bgcolor="#ffffff"
            border="1px solid"
            borderColor="#000000"
            css={{ maxWidth: 300, maxHeight: 600}}
        >
            <Grid container spacing={1} direction="column" alignItems="center">
                <Grid item>
                    <h4>PENGATURAN</h4>
                </Grid>
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
                <Grid item>
                    <Grid container spacing={2} direction="row" alignItems="center">
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
                        </Grid>
                        <Grid item>
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
                </Grid>
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
            <Grid container direction="column" alignItems="center">
                <Grid item>
                    <br/><h4>TIPE VISUALISASI</h4>
                </Grid>
                <Grid item>
                    <h6>VISUALISASI PATEN</h6>
                </Grid>         
                <Grid item>
                    <Grid container spacing={0.5} direction="row" alignItems="center">
                        <Grid item>
                            <Button 
                                className={props.vtype=='tmv'? classes.selectedButton : classes.button}
                                variant="contained"
                                value="tmv"
                                aria-label="tmv"
                                onClick={handleVtype}
                            >
                                <img src="/res/vizicon/tmv.png" height="20" alt="" /><br/>Tree<br/>Map
                            </Button>
                        </Grid>
                        <Grid item>
                            {
                                props.focus=="reg"? 
                                    <Button 
                                        className={props.vtype=='otv'? classes.selectedButton : classes.button}
                                        variant="contained"
                                        value="otv"
                                        aria-label="otv"
                                        onClick={handleVtype}
                                    >
                                        <img src="/res/vizicon/otv.png" height="15" alt="" /><br/>Over<br/>Time
                                    </Button> :
                                    <Button 
                                        className={props.vtype=='gmv'? classes.selectedButton : classes.button}
                                        variant="contained"
                                        value="gmv"
                                        aria-label="gmv"
                                        onClick={handleVtype}
                                    >
                                        <img src="/res/vizicon/gmv.png" height="15" alt="" /><br/>Geo<br/>Map
                                    </Button> 
                            }
                        </Grid>
                        <Grid item>
                        {
                                props.focus=="reg"? 
                                    <Button 
                                        className={props.vtype=='nsv'? classes.selectedButton : classes.button}
                                        variant="contained"
                                        value="nsv"
                                        aria-label="nsv"
                                        onClick={handleVtype}
                                    >
                                        <img src="/res/vizicon/nsv.png" height="15" alt="" /><br/>National<br/>Share
                                    </Button> :
                                    <Button 
                                        className={props.vtype=='otv'? classes.selectedButton : classes.button}
                                        variant="contained"
                                        value="otv"
                                        aria-label="otv"
                                        onClick={handleVtype}
                                    >
                                        <img src="/res/vizicon/otv.png" height="15" alt="" /><br/>Over<br/>Time
                                    </Button>
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {props.focus=='reg'? <Grid item><h6>VISUALISASI KOMPLEKSITAS</h6></Grid> : <Grid item></Grid>}
                {
                    props.focus=='reg'?
                    <Grid item>
                        <Grid container spacing={0.5} direction="row" alignItems="center">
                            <Grid item>
                                <Button 
                                    className={props.vtype=='isv'? classes.selectedButton : classes.button}
                                    variant="contained"
                                    value="isv"
                                    aria-label="isv"
                                    onClick={handleVtype}
                                >
                                    <img src="/res/vizicon/isv.png" height="15" alt="" /><br/>KI<br/>Space
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    className={props.vtype=='rcv'? classes.selectedButton : classes.button}
                                    variant="contained"
                                    value="rcv"
                                    aria-label="rcv"
                                    onClick={handleVtype}
                                >
                                    <img src="/res/vizicon/rcv.png" height="15" alt="" /><br/>Ring<br/>Chart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid> : <Grid item></Grid>
                }    
            </Grid> 
        </Box>
    )
}

export default AkinPanel;