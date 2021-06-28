import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import Panel from './Panel';
import Modifier from './Modifier';
import routes from '../../../server/providers/routesProvider'; 
import files from '../../../server/providers/resourceProvider';
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
    }

    updateYear(yr) {
        this.setState({year: yr});
    }
    
    loading() {
        this.setState({isLoaded: false});
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

    updateData() {
        fetch(`${routes.Explore}?vtype=${this.state.vtype}&year=${this.state.year}&focus=${this.state.focus}&regdim=${this.state.reg_dimension}&iprdim=${this.state.ipr_dimension}&code=${this.state.code}`)
        .then(res => res.json())
        .then((res) => {
            this.setState({data: res});
          })
        .catch( err => this.setState({error: err}));      
    }

    componentDidMount(){
       fetch(routes.Explore)
        .then(res => res.json()) 
        .then((res) => {
            this.setState({data: res, 
                isLoaded : true,
                vtype: 'tmv',
                year: 2018,
                focus: 'reg', //this.state.focus,
                reg_dimension: 'prov', //this.state.reg_dimension,
                ipr_dimension: 'ptn', //this.state.ipr_dimension,
                code: '12', //this.state.code,
                modifier: this.state.modifier
            });
          })
        .catch( err => this.setState({error: err}));
      }
      
    render(){
        this.updateData();
        return(
            <Container>
                <Row>
                    <Col xs="8" sm="8" md="8" lg="8">
                        <Row>
                            <h3>Paten apa saja yang dihasilkan di {files.ProvinceCode[this.state.code]} pada tahun {this.state.year} ?</h3>
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
                            updateCode={this.updateCode} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;