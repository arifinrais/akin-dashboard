import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, VizType} from 'react-fast-charts';

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
      var { error, isLoaded, data, vtype, focus, updateData } = this.props;
      
      if (error) {
        return <DataViz id={'errorMssg'} vizType={VizType.Error} message={error.message}/>;
      } else if (!isLoaded) {
        return <DataViz id={'loadMssg'} vizType={VizType.Error} message={'Loading...'}/>;
      } else {
        if (data.vtype=='err') return <DataViz id={'errorMssg'} vizType={VizType.Error} message={'Data tidak ditemukan'}/>;
        switch (vtype) {
          case 'tmv':
            if (data.vtype=="tmv") {
              if (data.children.length>0) return(<DataViz vizType={VizType.TreeMap} data={data} />);
            }
            updateData();
          case 'gmv':
            return(<DataViz id={'wipMssg'} vizType={VizType.Error} message={'Visualisasi Geo Map masih dalam tahap pengembangan'}/>);
          case 'otv':
            if (data.vtype=="otv") {
              return(<DataViz vizType={VizType.StackChart} data={focus=='reg'?data.stacksReg:data.stacksIpr} config={data.config} />);
            } else {
              updateData();
            }
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
              updateData();
            }
          case 'isv':
            return(<DataViz id={'wipMssg'} vizType={VizType.Error} message={'Visualisasi KI Space masih dalam tahap pengembangan'}/>); 
          case 'rcv':
            return(<DataViz id={'wipMssg'} vizType={VizType.Error} message={'Visualisasi Ring Chart masih dalam tahap pengembangan'}/>);
          default:
            return(<DataViz id={'settMssg'} vizType={VizType.Error} message={'Silahkan pilih pengaturan untuk menampilkan visualisasi'}/>);
        }
      }
      
    } 
}

export default Visualization;