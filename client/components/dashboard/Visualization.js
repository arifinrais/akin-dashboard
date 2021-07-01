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
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        switch (vtype) {
          case 'tmv':
            if (data.id=="dfr") {
              return(<DataViz vizType={VizType.TreeMap} data={data} />);
            } else {
              return <div>Loading...</div>;
            }
          case 'gmv':
            return(<div>Geo Map Viz is WIP</div>);
          case 'otv':
            return(<DataViz vizType={VizType.StackChart} data={data.lines} />);
          case 'nsv':
            if (data.lines) { //ini harus dibenerin dibeda2in identifiernya
              //kayanya animasinya ngerender lebih lambat daripada react engine
              return(<DataViz vizType={VizType.LineChart} 
                axisLabels={{left: 'Kontribusi terhadap Jumlah Paten Nasional (%)', bottom: 'Tahun'}}
                axisMinMax={{minY: -1, maxY: getLineChartMaxY(data.lines)+5, minX: 2000, maxX: 2018}}
                formatAxis={{x: n => n.toString()}}
                data={data.lines} />);
            } else {
              return <div>Loading...</div>;
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