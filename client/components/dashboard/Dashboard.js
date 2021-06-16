import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import Panel from './Panel';
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
            hid_modifier: [],
            iso_modifier: [],
            vtype: '',
            year: null,
            focus: '',
            reg_dimension: '',
            ipr_dimension: '',
            code: ''
        };
        this.updateYear = this.updateYear.bind(this);
        this.loading = this.loading.bind(this);

    }

    updateYear(yr) {
        this.setState({year: yr});
    }
    
    loading() {
        this.setState({isLoaded: false});
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
                focus: 'reg',
                reg_dimension: 'prov',
                ipr_dimension: 'ptn',
                code: '12'
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
                            <h2>CATEGORY</h2>
                        </Row>
                        <Row>
                            <Slider {...this.state} updateYear={this.updateYear}/>
                        </Row>
                    </Col>
                    <Col xs="4" sm="4" md="4" lg="4">
                        <Panel />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Dashboard;