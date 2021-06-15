import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, VizType} from 'react-fast-charts';
import routes from '../../../server/providers/routesProvider'; 
import * as d3 from 'd3';

class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            vtype: ''
        };
    }

    componentDidMount(){
       fetch(routes.Explore)
        .then(res => res.json()) 
        .then((res) => {
            this.setState({data: res});
            this.setState({isLoaded : true});
            this.setState({vtype: 'treemap'});
          })
        .catch( err => this.setState({error: err}));
      }

    render() {
      const { error, isLoaded, data } = this.state;
      
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <DataViz
          id={'example-tree-map'}
          vizType={VizType.TreeMap}
          data={data}
        /> 
        );
      }
      
    } 
}

export default Visualization;