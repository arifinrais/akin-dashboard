import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Visualization from './Visualization';
import Slider from './Slider.js';
import Panel from './Panel';
import routes from '../../../server/providers/routesProvider'; 

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            vtype: '',
            year: null
        };
    }

    componentDidMount(){
       fetch(routes.Explore)
        .then(res => res.json()) 
        .then((res) => {
            this.setState({data: res});
            this.setState({isLoaded : true});
            this.setState({vtype: 'treemap'});
            this.setState({year: 2018});
          })
        .catch( err => this.setState({error: err}));
      }
      
    render(){
        return(
            <Container>
                <Row>
                    <Col xs="8" sm="8" md="8" lg="8">
                        <Row>
                            <h3>Paten apa saja yang dihasilkan Jawa Barat pada tahun 2018?</h3>
                        </Row>
                        <Row>
                            <Visualization {...this.state}/>
                        </Row>
                        <Row>
                            <h2>CATEGORY</h2>
                        </Row>
                        <Row>
                            <Slider {...this.state}/>
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