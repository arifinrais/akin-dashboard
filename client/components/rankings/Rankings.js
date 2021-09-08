import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import routes from '../../../server/providers/routesProvider'; 
import files from '../../../server/providers/resourceProvider';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Resources from '../../../server/providers/resourceProvider';
import MenuItem from '@material-ui/core/MenuItem';
import RankingList from './RankingList';
//import axios from 'axios';

const defaultParam = {
    //define if needed
}

class Rankings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            year: '',
            focus: '',
            reg_dimension: '',
            ipr_dimension: '',
        };
        this.updateYear = this.updateYear.bind(this);
        this.loading = this.loading.bind(this);
        this.updateFocus = this.updateFocus.bind(this);
        this.updateRegDim = this.updateRegDim.bind(this);
        this.updateIprDim = this.updateIprDim.bind(this);
    }

    updateYear(event) {
        //this.loading();
        this.setState({year: event.target.value});
        this.updateData();
    }
    
    loading() {
        this.setState({
            data: {},
            isLoaded: false});
    }

    updateFocus(event) {
        this.setState({focus: event.target.value});
        this.updateData();
    }

    updateRegDim(event) {
        this.setState({reg_dimension: event.target.value});
        this.updateData();
    }

    updateIprDim(event) {
        this.setState({ipr_dimension: event.target.value});
        this.updateData();
    }

    updateData() {
        fetch(`${routes.Rankings}?year=${this.state.year}&regdim=${this.state.reg_dimension}&iprdim=${this.state.ipr_dimension}`)
        .then(res => res.json())
        .then((res) => {
            //console.log(res);
            this.setState({data: res,
                isLoaded : true,
                year: this.state.year,
                focus: this.state.focus,
                reg_dimension: this.state.reg_dimension,
                ipr_dimension: this.state.ipr_dimension
            });
            })
        .catch( err => this.setState({error: err}));  
    }

    getTitle() {
        let region = this.state.reg_dimension=='prov'? "Provinsi" : "Kabupaten/Kota";
        let iprop = this.state.ipr_dimension=='ptn'? "Paten": this.state.ipr_dimension=='trd'? "Merek Dagang" : 
            this.state.ipr_dimension=='pub'? "Publikasi Ilmiah" : '';
        if (this.state.focus == 'reg') {
            return(<h3>Ranking Kompleksitas {region} pada Tahun {this.state.year} berdasarkan {iprop}</h3>);
        } else if (this.state.focus == 'ipr') {
            return(<h3>Ranking Kompleksitas {iprop} pada Tahun {this.state.year} berdasarkan {region}</h3>);
        }
    }

    getYears() {
        let temp = []
        for (let i=2000; i<2019; i++) {
            temp.push(<MenuItem value={i.toString()}>{i}</MenuItem>);
        }
        return temp;
    }

    componentDidMount(){
       fetch(routes.Rankings)
        .then(res => res.json()) 
        .then((res) => {
            this.setState({data: res, 
                isLoaded : true,
                year: 2018,
                focus: 'reg', 
                reg_dimension: 'city', //prov
                ipr_dimension: 'ptn',
            });
          })
        .catch( err => this.setState({error: err}));
        this.render();
      }

    render(){
        return(
            <Grid container direction="row" justify="space-evenly">
                <Grid item xs={6}>
                    <Grid container spacing={1} direction="column" justify="space-evenly">
                        <Grid item>
                            {this.getTitle()}
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="flex-end">
                                <Grid item>
                                    <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="flex-end"
                                    alignContent="flex-end"
                                    fontWeight="fontWeightMedium"
                                    fontSize="12px"
                                    >
                                        <FormControl style={{width:80}}/*className={classes.formControl}*/>
                                            <Select
                                            value={this.state.focus}
                                            onChange={this.updateFocus}
                                            /*className={classes.selectEmpty}*/
                                            >
                                                <MenuItem value={''}><em>Pilih Indeks</em></MenuItem>
                                                <MenuItem value={'reg'}>KCI</MenuItem>
                                                <MenuItem value={'ipr'}>IPCI</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                &nbsp;&nbsp;&nbsp;
                                <Grid item>
                                    <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="flex-end"
                                    alignContent="flex-end"
                                    fontWeight="fontWeightMedium"
                                    fontSize="12px"
                                    >
                                        <FormControl style={{width:80}}/*className={classes.formControl}*/>
                                            <Select
                                            value={this.state.reg_dimension}
                                            onChange={this.updateRegDim}
                                            /*className={classes.selectEmpty}*/
                                            >
                                                <MenuItem value={''}><em>Tingkat Daerah</em></MenuItem>
                                                <MenuItem value={'city'}>Kabupaten/Kota</MenuItem>
                                                <MenuItem value={'prov'}>Provinsi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                &nbsp;&nbsp;&nbsp;
                                <Grid item>
                                    <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="flex-end"
                                    alignContent="flex-end"
                                    fontWeight="fontWeightMedium"
                                    fontSize="12px"
                                    >
                                        <FormControl style={{width:80}}/*className={classes.formControl}*/>
                                            <Select
                                            value={this.state.ipr_dimension}
                                            onChange={this.updateIprDim}
                                            /*className={classes.selectEmpty}*/
                                            >
                                                <MenuItem value={''}><em>Jenis KI</em></MenuItem>
                                                <MenuItem value={'ptn'}>Paten</MenuItem>
                                                <MenuItem value={'pub'}>Publikasi Ilmiah</MenuItem>
                                                <MenuItem value={'trd'}>Merek Dagang</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                &nbsp;&nbsp;&nbsp;
                                <Grid item>
                                    <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="flex-end"
                                    alignContent="flex-end"
                                    fontWeight="fontWeightMedium"
                                    fontSize="12px"
                                    >
                                        <FormControl style={{width:80}}/*className={classes.formControl}*/>
                                            <Select
                                            value={this.state.year}
                                            onChange={this.updateYear}
                                            /*className={classes.selectEmpty}*/
                                            >
                                                <MenuItem value={2018}><em>Pilih Tahun</em></MenuItem>
                                                {this.getYears()}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justify="space-evenly" /*style={{width: '100%', gridTemplateColumns: "1fr 7fr" }}>*/>
                                <Grid item>
                                    <img src={'../res/color-range.png'}/>
                                </Grid>
                                <Grid item>
                                    <RankingList {...this.state} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Rankings;