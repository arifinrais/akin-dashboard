import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import Panel from './Panel';
import Modifier from './Modifier';
import routes from '../../../server/providers/routesProvider'; 
import files from '../../../server/providers/resourceProvider';
import Grid from "@material-ui/core/Grid";
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
            year: null,
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

    updateModifier(lst) {
        if (this.state.modifier.includes(lst[0])) {
            this.state.modifier = this.state.modifier.filter((x)=>x!=lst[0]);
        } else {
            this.state.modifier.push(lst[0]);
        }
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

    updateCode(cd) {
        this.setState({code: cd});
    }

    updateVtype(vtp) {
        console.log(vtp);
        this.setState({vtype: vtp});
    }

    updateData() {
        fetch(`${routes.Explore}?vtype=${this.state.vtype}&year=${this.state.year}&focus=${this.state.focus}&regdim=${this.state.reg_dimension}&iprdim=${this.state.ipr_dimension}&code=${this.state.code}&hide=${this.state.modifier}`)
        .then(res => res.json())
        .then((res) => {
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
                        files.CityCode[this.state.code]} terhadap perkembangan jumlah {iprop.toLowerCase()} di Indonesia?</h3>);
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
                code: '51', //12
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
                            <Grid container direction="row" justify="space-evenly">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={6}>
                                    <Modifier {...this.state} updateModifier={this.updateModifier}/>
                                </Grid>
                                <Grid item xs={3}>
                                </Grid>
                            </Grid>
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
        /*return(
            <Container>
                <Row>
                    <Col xs="8" sm="8" md="8" lg="8">
                        <Row>
                            {this.getTitle()}
                        </Row>
                        <Row>
                            <Visualization {...this.state}/>
                        </Row>
                        <Row>
                            <Modifier {...this.state} updateModifier={this.updateModifier}/>
                        </Row>
                        <Row>
                            <Slider {...this.state} updateYear={this.updateYear}/>
                        </Row>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg="4">
                        <Panel {...this.state}
                            updateFocus={this.updateFocus} 
                            updateRegDim={this.updateRegDim}
                            updateIprDim={this.updateIprDim}
                            updateCode={this.updateCode} 
                            updateVtype={this.updateVtype} />
                    </Col>
                </Row>
            </Container>
        )*/
    }
}

export default Dashboard;