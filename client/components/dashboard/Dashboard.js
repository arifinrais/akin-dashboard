import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import Panel from './Panel';
import Modifier from './Modifier';
import routes from '../../../server/providers/routesProvider'; 
import files from '../../../server/providers/resourceProvider';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import {VizType} from 'react-fast-charts';
//import axios from 'axios';

const defaultParam = {
    //define if needed
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            modifier: [],
            vtype: '',
            year: '',
            focus: '',
            reg_dimension: '',
            ipr_dimension: '',
            code: ''
        };
        this.updateYear = this.updateYear.bind(this);
        this.loading = this.loading.bind(this);
        this.updateModifier = this.updateModifier.bind(this);
        this.updateFocus = this.updateFocus.bind(this);
        this.updateRegDim = this.updateRegDim.bind(this);
        this.updateIprDim = this.updateIprDim.bind(this);
        this.updateCode = this.updateCode.bind(this);
        this.updateVtype = this.updateVtype.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    updateYear(yr) {
        //this.loading();
        this.setState({year: yr});
        this.updateData();
    }
    
    loading() {
        this.setState({
            data: {},
            isLoaded: false});
    }

    updateModifier(lst) {
        if (this.state.modifier.includes(lst[0])) {
            this.state.modifier = this.state.modifier.filter((x)=>x!=lst[0]);
        } else {
            this.state.modifier.push(lst[0]);
        }
        this.updateData();
    }

    updateFocus(foc) {
        this.setState({focus: foc});
        this.updateData();
    }

    updateRegDim(regdim) {
        this.setState({reg_dimension: regdim});
        this.updateData();
    }

    updateIprDim(iprdim) {
        this.setState({ipr_dimension: iprdim});
        this.updateData();
    }

    updateCode(cd) {
        this.setState({code: cd});
        this.updateData();
    }

    updateVtype(vtp) {
        vtp=='otv'? this.setState({year: [2000, 2018]}): this.setState({year:2018});
        this.setState({vtype: vtp});
        this.updateData();
    }

    updateData() {
        fetch(`${routes.Explore}?vtype=${this.state.vtype}&year=${this.state.year}&focus=${this.state.focus}&regdim=${this.state.reg_dimension}&iprdim=${this.state.ipr_dimension}&code=${this.state.code}&hide=${this.state.modifier}`)
        .then(res => res.json())
        .then((res) => {
            //console.log(res);
            this.setState({data: res,
                isLoaded : true,
                vtype: this.state.vtype,
                year: this.state.year,
                focus: this.state.focus,
                reg_dimension: this.state.reg_dimension,
                ipr_dimension: this.state.ipr_dimension,
                code: this.state.code,
                modifier: this.state.modifier
            });
            this.render();
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
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentChooser[this.state.code] : 
                        iprop=="Merek Dagang"? files.TrademarkChooser[this.state.code] : files.PublicationChooser[this.state.code]} pada tahun {this.state.year}?</h3>);     
                case 'gmv':
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentChooser[this.state.code] : 
                    iprop=="Merek Dagang"? files.TrademarkChooser[this.state.code] : files.PublicationChooser[this.state.code]} pada tahun {this.state.year}?</h3>);
                case 'otv':
                    return(<h3>{region} apa saja yang menghasilkan {iprop.toLowerCase()} {iprop=="Paten"? files.PatentChooser[this.state.code] : 
                    iprop=="Merek Dagang"? files.TrademarkChooser[this.state.code] : files.PublicationChooser[this.state.code]} pada tahun {this.state.year[0]} hingga {this.state.year[1]}?</h3>); 
            }
        }
        
    }

    getTotal() {
        if (this.state.vtype=='tmv' || this.state.vtype=='gmv' || this.state.vtype=='isv' || this.state.vtype=='rcv') {
            return(<Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="flex-end"
                        alignContent="flex-end"
                        fontWeight="fontWeightMedium"
                        fontSize="12px"
                    >
                        Jumlah Paten: {this.state.data.total_shown? 
                            this.state.data.total_shown : "0"}
                    </Box>);
        }
        return;
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
        return(
            <Grid container direction="row" justify="space-evenly">
                <Grid item xs={8}>
                    <Grid container spacing={1} direction="column" justify="space-evenly">
                        <Grid item>
                            {this.getTitle()}
                            {this.getTotal()}
                        </Grid>
                        <Grid item>
                            <Visualization {...this.state} updateData={this.updateData}/>
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
                        updateData={this.updateData}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default Dashboard;