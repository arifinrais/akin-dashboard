import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, 
  VizType, 
  LineChartDatum,
  LabelPosition,
  LabelAnchor} from 'react-fast-charts';

//import * as d3 from 'd3';

function getLineChartMaxY(lines) {
  let max=0;
  for (let i=0; i<lines.length;i++) {
    for (let j=0; j<lines[i]["coords"].length; j++) {
      if (lines[i]["coords"][j]["y"]>max) max=lines[i]["coords"][j]["y"];
    }
  }
  return max;
}

class Visualization extends Component {
    render() {
      var { error, isLoaded, data, vtype } = this.props;
      
      if (error) {
        return <DataViz id={'errorMssg'} vizType={VizType.Error} message={error.message}/>;
      } else if (!isLoaded) {
        return <DataViz id={'loadMssg'} vizType={VizType.Error} message={'Loading...'}/>;
      } else {
        if (data.vtype=='err') return <DataViz id={'errorMssg'} vizType={VizType.Error} message={'Data tidak ditemukan'}/>;
        switch (vtype) {
          case 'tmv':
            if (data.vtype=="tmv") {
              return(<DataViz vizType={VizType.TreeMap} data={data} />);
            } else {
              return <DataViz id={'loadMssg'} vizType={VizType.Error} message={'Loading...'}/>;
            }
          case 'gmv':
            return(<div>Geo Map Viz is WIP</div>);
          case 'otv':
            return(<DataViz vizType={VizType.StackChart} data={data.lines} />);
          case 'nsv':
            if (data.vtype=="nsv") {
              let tempMaxY = getLineChartMaxY(data.lines);
              return (tempMaxY==0? <DataViz id={'errorMssg'} vizType={VizType.Error} message={'Data tidak ditemukan'}/>:
              <DataViz vizType={VizType.LineChart} 
                axisLabels={{left: 'Kontribusi (%)', bottom: 'Tahun'}}
                axisMinMax={{minY: 0, maxY: getLineChartMaxY(data.lines)+5, minX: 2000, maxX: 2018}}
                formatAxis={{x: n => n.toString()}}
                data={data.lines} />);
            } else {
              return <DataViz id={'loadMssg'} vizType={VizType.Error} message={'Loading...'}/>;
            }
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