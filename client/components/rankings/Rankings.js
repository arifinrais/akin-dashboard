import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import routes from '../../../server/providers/routesProvider'; 
import files from '../../../server/providers/resourceProvider';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import {VizType} from 'react-fast-charts';
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
            data: [],
            year: '',
            focus: '',
            reg_dimension: '',
            ipr_dimension: '',
            sortby: ''/*,
            search: ''*/
        };
        this.updateYear = this.updateYear.bind(this);
        this.loading = this.loading.bind(this);
        this.updateFocus = this.updateFocus.bind(this);
        this.updateRegDim = this.updateRegDim.bind(this);
        this.updateIprDim = this.updateIprDim.bind(this);
    }

    updateYear(yr) {
        //this.loading();
        this.setState({year: yr});
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
        fetch(`${routes.Rankings}?year=${this.state.year}&focus=${this.state.focus}&regdim=${this.state.reg_dimension}&iprdim=${this.state.ipr_dimension}&sortby=${this.state.sortby}`)
        .then(res => res.json())
        .then((res) => {
            //console.log(res);
            this.setState({data: res,
                isLoaded : true,
                year: this.state.year,
                focus: this.state.focus,
                reg_dimension: this.state.reg_dimension,
                ipr_dimension: this.state.ipr_dimension,
                sortby: this.state.sortby
            });
          })
        .catch( err => this.setState({error: err}));      
    }

    getTitle() {
        let region = this.state.reg_dimension=='prov'? "Provinsi" : "Kabupaten/Kota";
        let iprop =  ""
        if (this.state.ipr_dimension=='ptn') {
            iprop="Paten";
        } if (this.state.ipr_dimension=='trd') {
            iprop="Merek dagang";
        } if (this.state.ipr_dimension=='pub') {
            iprop="Publikasi ilmiah";
        }
        if (this.state.focus == 'reg') {
            switch (this.state.vtype) {
                case 'tmv':
                    return(<h3>{iprop} apa saja yang dihasilkan di {region=='Provinsi'? files.ProvinceCode[this.state.code] :
                        files.CityCode[this.state.code]} pada tahun {this.state.year}?</h3>); 
                case 'otv':
                    return(<h3>{iprop} apa saja yang dihasilkan di {region=='Provinsi'? files.ProvinceCode[this.state.code] :
                        files.CityCode[this.state.code]} pada tahun {this.state.year[0]} hingga {this.state.year[1]}?</h3>); 
                case 'nsv':
                    return(<h3>Berapa persen kontribusi {region=='Provinsi'? files.ProvinceCode[this.state.code] :
                        files.CityCode[this.state.code]} terhadap jumlah {iprop.toLowerCase()} nasional?</h3>);
                case 'isv':
                    return(<h3>{iprop} apa saja yang dihasilkan di {region=='Provinsi'? files.ProvinceCode[this.state.code] :
                        files.CityCode[this.state.code]} pada tahun {this.state.year}?</h3>);
                case 'rcv':
                    return(<h3>{iprop} apa saja yang dihasilkan di {region=='Provinsi'? files.ProvinceCode[this.state.code] :
                        files.CityCode[this.state.code]} pada tahun {this.state.year}?</h3>);
            }
        } else if (this.state.focus == 'ipr') {
            switch (this.state.vtype) {
                case 'tmv':
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentCode[this.state.code] : 
                        iprop=="Merek Dagang"? "placeholder trd" : "placeholder pub"} pada tahun {this.state.year}?</h3>);     
                case 'gmv':
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentCode[this.state.code] : 
                        iprop=="Merek Dagang"? "placeholder trd" : "placeholder pub"} pada tahun {this.state.year}?</h3>);
                case 'otv':
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentCode[this.state.code] : 
                        iprop=="Merek Dagang"? "placeholder trd" : "placeholder pub"} pada tahun {this.state.year[0]} hingga {this.state.year[1]}?</h3>); 
            }
        }
        
    }

    componentDidMount(){
       fetch(routes.Explore)
        .then(res => res.json()) 
        .then((res) => {
            this.setState({data: res, 
                isLoaded : true,
                vtype: 'tmv',
                year: 2018,
                focus: 'reg', 
                reg_dimension: 'city', //prov
                ipr_dimension: 'ptn',
                code: '180', //12
                modifier: []
            });
          })
        .catch( err => this.setState({error: err}));
      }
      
    render(){
        this.updateData();
        return(
            <Grid container direction="row" justify="space-evenly">
                <Grid item xs={8}>
                    <Grid container spacing={1} direction="column" justify="space-evenly">
                        <Grid item>
                            {this.getTitle()}
                        </Grid>
                        <Grid item>
                            <Visualization {...this.state}/>
                        </Grid>
                        <Grid item>
                            <Modifier {...this.state} updateModifier={this.updateModifier}/>
                        </Grid>
                        <Grid item>
                            <Slider {...this.state} updateYear={this.updateYear}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2.5}>
                    <Panel {...this.state}
                        updateFocus={this.updateFocus} 
                        updateRegDim={this.updateRegDim}
                        updateIprDim={this.updateIprDim}
                        updateCode={this.updateCode} 
                        updateVtype={this.updateVtype} 
                    />
                </Grid>
            </Grid>
        )
    }
}

export default Rankings;