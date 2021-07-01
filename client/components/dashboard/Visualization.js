import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, 
  VizType, 
  LineChartDatum,
  LabelPosition,
  LabelAnchor} from 'react-fast-charts';

//import * as d3 from 'd3';

class Visualization extends Component {
    render() {
      var { error, isLoaded, data, vtype } = this.props;
      
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        switch (vtype) {
          case 'tmv':
            return(<DataViz vizType={VizType.TreeMap} data={data} />);     
          case 'gmv':
            return(<div>Geo Map Viz is WIP</div>);
          case 'otv':
            return(<DataViz vizType={VizType.StackChart} data={data.lines} />);
          case 'nsv':
            return(<DataViz vizType={VizType.LineChart} 
              axisLabels={{left: 'Jumlah Paten', bottom: 'Tahun'}}
              axisMinMax={{minY: -10, maxY: 100, minX: 2000, maxX: 2018}}
              formatAxis={{x: n => n.toString()}}
              data={data} />);
          case 'isv':
            return(<div>KI Space Viz is WIP</div>); 
          case 'rcv':
            return(<div>Ring Chart Viz is WIP</div>);
          default:
            return(<div>Please set all the settings needed for visualization</div>);
        }
      }
      
    } 
}

export default Visualization;