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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    maxWidth: '50', 
    maxHeight: '50', 
    minWidth: '50', 
    minHeight: '50'
  },
}));

const AkinPanel = props => {
    //const [alignment, setAlignment] = React.useState("left");
    //var { isLoaded, vtype, focus, reg_dimension, ipr_dimension, code } = props;
    const classes = useStyles();
    var code_options = {};
    var isFnDSelected = false;
    var selectedButton = '';

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
        selectedButton=ev.currentTarget.value;
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
        <Container>
            <Grid container spacing={4} direction="column" alignItems="center">
                <Grid Item>
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
                </Grid>
                <Grid item>
                    <Grid container spacing={2} direction="column" alignItems="center">
                        <Grid item>
                            <h4>TIPE VISUALISASI</h4>
                        </Grid>
                        <Grid item>
                            <h6>VISUALISASI PATEN</h6>
                        </Grid>         
                        <Grid item>
                            <Grid container spacing={2} direction="row" alignItems="center">
                                <Grid item>
                                    <Button 
                                        className={classes.button}
                                        color={selectedButton=='tmv'? "primary" : "secondary"} 
                                        variant="contained"
                                        value="tmv"
                                        aria-label="tmv"
                                        onClick={handleVtype}
                                    >
                                        <img src="/res/vizicon/tmv.png" height="25" alt="" /><br/>Tree Map
                                    </Button>
                                </Grid>
                                <Grid item>
                                    {
                                        props.focus=="reg"? 
                                        <Button 
                                            className={classes.button}
                                            color={selectedButton=='otv'? "primary" : "secondary"} 
                                            variant="contained"
                                            value="otv"
                                            aria-label="otv"
                                            onClick={handleVtype}
                                        >
                                            <img src="/res/vizicon/otv.png" height="25" alt="" /><br/>Over Time
                                        </Button> :
                                        <Button 
                                            className={classes.button}
                                            color={selectedButton=='gmv'? "primary" : "secondary"} 
                                            variant="contained"
                                            value="gmv"
                                            aria-label="gmv"
                                            onClick={handleVtype}
                                        >
                                            <img src="/res/vizicon/gmv.png" height="25" alt="" /><br/>Geo Map
                                        </Button> 
                                    }
                                </Grid>
                                <Grid item>
                                    {
                                        props.focus=="reg"? 
                                            <Button size="small" value="nsv" aria-label="nsv">National Share</Button> :
                                            <Button size="small" value="otv" aria-label="otv">Over Time</Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h6>VISUALISASI KOMPLEKSITAS</h6>
                        </Grid>   
                        <Grid item>
                        <Grid container spacing={2} direction="row" alignItems="center">
                                <Grid item>
                                    <Button size="small" value="isv" aria-label="isv">
                                        KI Space
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" value="rcv" aria-label="rcv">
                                        Ring Chart
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>        
                    </Grid>
                </Grid>      
            </Grid> 
        </Container>
    )
}

export default AkinPanel;