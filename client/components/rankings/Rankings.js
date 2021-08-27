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
        console.log(event.target.value);
        this.setState({year: event.target.value});
    }
    
    loading() {
        this.setState({
            data: {},
            isLoaded: false});
    }

    updateFocus(foc) {
        this.setState({focus: foc});
    }

    updateRegDim(regdim) {
        this.setState({reg_dimension: regdim});
    }

    updateIprDim(iprdim) {
        this.setState({ipr_dimension: iprdim});
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
        let iprop = this.state.ipr_dimension=='ptn'? "Paten": this.state.ipr_dimension=='trd'? "Merek dagang" : 
            this.state.ipr_dimension=='pub'? "Publikasi ilmiah" : '';
        if (this.state.focus == 'reg') {
            return(<h3>Ranking Kompleksitas {region} pada Tahun {this.state.year}</h3>);
        } else if (this.state.focus == 'ipr') {
            return(<h3>Ranking Kompleksitas {iprop} pada Tahun {this.state.year}</h3>);
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
      }

    render(){
        this.updateData();
        return(
            <Grid container direction="row" justify="space-evenly">
                <Grid item xs={6}>
                    <Grid container spacing={1} direction="column" justify="space-evenly">
                        <Grid item>
                            {this.getTitle()}
                        </Grid>
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
                        <Grid item>
                            <Grid container direction="row" justify="space-evenly" /*style={{width: '100%', gridTemplateColumns: "1fr 7fr" }}>*/>
                                <Grid item >
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