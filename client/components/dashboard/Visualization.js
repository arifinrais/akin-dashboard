import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, VizType} from 'react-fast-charts';
//import * as d3 from 'd3';

class Visualization extends Component {
    render() {
      var { error, isLoaded, data } = this.props;
      
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