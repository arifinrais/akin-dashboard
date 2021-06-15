import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {DataViz, VizType} from 'react-fast-charts';
import axios from 'axios';
import routes from '../../server/providers/routesProvider'; 
import * as d3 from 'd3';

const RootDatum = {
    "id": "example-tree-map-data",
    "label": "example-tree-map-data",
    "children": [
     {
      "id": "Beverages",
      "label": "Beverages",
      "fill": "#537DAA",
      "children": [
         {
           "id": "Beverages",
           "label": "Beverages",
           "tooltipContent": "Beverages",
           "size": 0.5
         }
       ]
      },
     {
      "id": "Chemicals",
      "label": "Chemicals",
      "fill": "#A1CBE7",
      "children": [
         {
           "id": "Chemicals1",
           "label": "Chemicals 1",
           "tooltipContent": "Chemicals1",
           "size": 2
         },
         {
           "id": "Chemicals2",
           "label": "Chemicals 2",
           "tooltipContent": "Chemicals2",
           "size": 2
         },
         {
           "id": "Chemicals3",
           "label": "Chemicals 3",
           "tooltipContent": "Chemicals3",
           "size": 1
         },
         {
           "id": "Chemicals4",
           "label": "Chemicals 4",
           "tooltipContent": "Chemicals4",
           "size": 0.5
         },
         {
           "id": "Chemicals5",
           "label": "Chemicals 5",
           "tooltipContent": "Chemicals5",
           "size": 1
         }
       ]
      },
     {
      "id": "CrudeMaterials",
      "label": "CrudeMaterials",
      "fill": "#F08D34",
      "children": [
         {
           "id": "CrudeMaterials",
           "label": "Crude Materials",
           "tooltipContent": "CrudeMaterials",
           "size": 1
         }
       ]
      },
     {
      "id": "Food",
      "label": "Food",
      "fill": "#F5BD7D",
      "children": [
         {
           "id": "Fish",
           "label": "Fish",
           "tooltipContent": "Fish",
           "size": 8
         },
         {
           "id": "Poultry",
           "label": "Poultry",
           "tooltipContent": "Poultry",
           "size": 8
         }
       ]
      },
     {
      "id": "MachineryandVehicles",
      "label": "Machinery and Vehicles",
      "fill": "#8CD17D",
      "children": [
         {
           "id": "Road",
           "label": "Road",
           "tooltipContent": "Road",
           "size": 5
         },
         {
           "id": "Cars",
           "label": "Cars",
           "tooltipContent": "Cars",
           "size": 4
         },
         {
           "id": "Trucks",
           "label": "Trucks",
           "tooltipContent": "Trucks",
           "size": 3
         },
         {
           "id": "Tires",
           "label": "Tires",
           "tooltipContent": "Tires",
           "size": 1
         },
         {
           "id": "Other",
           "label": "Other",
           "tooltipContent": "Other",
           "size": 0.5
         }
       ]
      },
     {
      "id": "Material Manufacturers",
      "label": "Material Manufacturers",
      "fill": "#B69930",
      "children": [
         {
           "id": "Leather",
           "label": "Leather",
           "tooltipContent": "Leather",
           "size": 16
         },
         {
           "id": "Cotton",
           "label": "Cotton",
           "tooltipContent": "Cotton",
           "size": 4
         },
         {
           "id": "Wool",
           "label": "Wool",
           "tooltipContent": "Wool",
           "size": 4
         }
       ]
      },
     {
      "id": "Unspecified",
      "label": "Unspecified",
      "fill": "#86BCB6",
      "children": [
         {
           "id": "SpecialTransactions",
           "label": "Special Transactions, commodity not classified according to class",
           "tooltipContent": "Special Transactions, commodity not classified according to class",
           "size": 28
         }
       ]
      },
     {
      "id": "Services",
      "label": "Services",
      "fill": "#499894",
      "children": [
         {
           "id": "TravelandTourism",
           "label": "Travel and Tourism",
           "tooltipContent": "TravelandTourism",
           "size": 60
         }
       ]
      },
     {
      "id": "VegetableOils",
      "label": "VegetableOils",
      "fill": "#E56F72",
      "children": [
         {
           "id": "OliveOil",
           "label": "Olive Oil",
           "tooltipContent": "OliveOil",
           "size": 0.4
         }
       ]
      }
    ]
   };

const DefaultDatum = {"_id":"60c719f0fc0abffe762be49c","children":[{"_id":"60c719f0fc0abffe762be49d","id":"Human necessities","label":"Human necessities","fill":"#B23D6D","children":[{"_id":"60c719f0fc0abffe762be49e","id":"Agriculture; forestry; animal husbandry; hunting; trapping; fishing","label":"Agriculture; forestry; animal husbandry; hunting; trapping; fishing","tooltipContent":"Agriculture; forestry; animal husbandry; hunting; trapping; fishing","size":4.05},{"_id":"60c719f0fc0abffe762be49f","id":"Baking; equipment for making or processing doughs; doughs for baking","label":"Baking; equipment for making or processing doughs; doughs for baking","tooltipContent":"Baking; equipment for making or processing doughs; doughs for baking","size":2.7},{"_id":"60c719f0fc0abffe762be4a0","id":"Foods or foodstuffs; their treatment, not covered by other classes","label":"Foods or foodstuffs; their treatment, not covered by other classes","tooltipContent":"Foods or foodstuffs; their treatment, not covered by other classes","size":19.59},{"_id":"60c719f0fc0abffe762be4a1","id":"Medical or veterinary science; hygiene","label":"Medical or veterinary science; hygiene","tooltipContent":"Medical or veterinary science; hygiene","size":8.78}]},{"_id":"60c719f0fc0abffe762be4a2","id":"Performing operations; transporting","label":"Performing operations; transporting","fill":"#F5CF22","children":[{"_id":"60c719f0fc0abffe762be4a3","id":"Physical or chemical processes or apparatus in general","label":"Physical or chemical processes or apparatus in general","tooltipContent":"Physical or chemical processes or apparatus in general","size":5.18},{"_id":"60c719f0fc0abffe762be4a4","id":"Disposal of solid waste; reclamation of contaminated soil","label":"Disposal of solid waste; reclamation of contaminated soil","tooltipContent":"Disposal of solid waste; reclamation of contaminated soil","size":0.68},{"_id":"60c719f0fc0abffe762be4a5","id":"Working or preserving wood or similar material; nailing or stapling machines in general","label":"Working or preserving wood or similar material; nailing or stapling machines in general","tooltipContent":"Working or preserving wood or similar material; nailing or stapling machines in general","size":1.35},{"_id":"60c719f0fc0abffe762be4a6","id":"Working cement, clay, or stone","label":"Working cement, clay, or stone","tooltipContent":"Working cement, clay, or stone","size":0.68},{"_id":"60c719f0fc0abffe762be4a7","id":"Working of plastics; working of substances in a plastic state in general","label":"Working of plastics; working of substances in a plastic state in general","tooltipContent":"Working of plastics; working of substances in a plastic state in general","size":1.35},{"_id":"60c719f0fc0abffe762be4a8","id":"Presses","label":"Presses","tooltipContent":"Presses","size":0.68},{"_id":"60c719f0fc0abffe762be4a9","id":"Layered products","label":"Layered products","tooltipContent":"Layered products","size":1.35},{"_id":"60c719f0fc0abffe762be4aa","id":"Railways","label":"Railways","tooltipContent":"Railways","size":0.68},{"_id":"60c719f0fc0abffe762be4ab","id":"Conveying; packing; storing; handling thin or filamentary material","label":"Conveying; packing; storing; handling thin or filamentary material","tooltipContent":"Conveying; packing; storing; handling thin or filamentary material","size":0.68}]},{"_id":"60c719f0fc0abffe762be4ac","id":"Chemistry; metallurgy","label":"Chemistry; metallurgy","fill":"#C57CD9","children":[{"_id":"60c719f0fc0abffe762be4ad","id":"Treatment of water, waste water, sewage, or sludge","label":"Treatment of water, waste water, sewage, or sludge","tooltipContent":"Treatment of water, waste water, sewage, or sludge","size":4.05},{"_id":"60c719f0fc0abffe762be4ae","id":"Cements; concrete; artificial stone; ceramics; refractories","label":"Cements; concrete; artificial stone; ceramics; refractories","tooltipContent":"Cements; concrete; artificial stone; ceramics; refractories","size":2.03},{"_id":"60c719f0fc0abffe762be4af","id":"Organic chemistry","label":"Organic chemistry","tooltipContent":"Organic chemistry","size":0.45},{"_id":"60c719f0fc0abffe762be4b0","id":"Organic macromolecular compounds; their preparation or chemical working-up; compositions based thereon","label":"Organic macromolecular compounds; their preparation or chemical working-up; compositions based thereon","tooltipContent":"Organic macromolecular compounds; their preparation or chemical working-up; compositions based thereon","size":2.03},{"_id":"60c719f0fc0abffe762be4b1","id":"Petroleum, gas or coke industries; technical gases containing carbon monoxide; fuels; lubricants; peat","label":"Petroleum, gas or coke industries; technical gases containing carbon monoxide; fuels; lubricants; peat","tooltipContent":"Petroleum, gas or coke industries; technical gases containing carbon monoxide; fuels; lubricants; peat","size":1.35},{"_id":"60c719f0fc0abffe762be4b2","id":"Animal or vegetable oils, fats, fatty substances or waxes; fatty acids therefrom; detergents; candles","label":"Animal or vegetable oils, fats, fatty substances or waxes; fatty acids therefrom; detergents; candles","tooltipContent":"Animal or vegetable oils, fats, fatty substances or waxes; fatty acids therefrom; detergents; candles","size":0.68},{"_id":"60c719f0fc0abffe762be4b3","id":"Biochemistry; beer; spirits; wine; vinegar; microbiology; enzymology; mutation or genetic engineering","label":"Biochemistry; beer; spirits; wine; vinegar; microbiology; enzymology; mutation or genetic engineering","tooltipContent":"Biochemistry; beer; spirits; wine; vinegar; microbiology; enzymology; mutation or genetic engineering","size":7.03},{"_id":"60c719f0fc0abffe762be4b4","id":"Electrolytic or electrophoretic processes; apparatus therefor","label":"Electrolytic or electrophoretic processes; apparatus therefor","tooltipContent":"Electrolytic or electrophoretic processes; apparatus therefor","size":0.54}]},{"_id":"60c719f0fc0abffe762be4b5","id":"Textiles; paper","label":"Textiles; paper","fill":"#7CDAA0","children":[{"_id":"60c719f0fc0abffe762be4b6","id":"Treatment of textiles or the like; laundering; flexible materials not otherwise provided for","label":"Treatment of textiles or the like; laundering; flexible materials not otherwise provided for","tooltipContent":"Treatment of textiles or the like; laundering; flexible materials not otherwise provided for","size":2.7}]},{"_id":"60c719f0fc0abffe762be4b7","id":"Fixed constructions","label":"Fixed constructions","fill":"#BC968A","children":[{"_id":"60c719f0fc0abffe762be4b8","id":"Hydraulic engineering; foundations; soil-shifting","label":"Hydraulic engineering; foundations; soil-shifting","tooltipContent":"Hydraulic engineering; foundations; soil-shifting","size":1.35},{"_id":"60c719f0fc0abffe762be4b9","id":"Building","label":"Building","tooltipContent":"Building","size":2.03}]},{"_id":"60c719f0fc0abffe762be4ba","id":"Mechanical engineering; lighting; heating; weapons; blasting","label":"Mechanical engineering; lighting; heating; weapons; blasting","fill":"#D97B7B","children":[{"_id":"60c719f0fc0abffe762be4bb","id":"Machines or engines for liquids; wind, spring, or weight motors; producing mechanical power or a reactive propulsive thrust, not otherwise provided for","label":"Machines or engines for liquids; wind, spring, or weight motors; producing mechanical power or a reactive propulsive thrust, not otherwise provided for","tooltipContent":"Machines or engines for liquids; wind, spring, or weight motors; producing mechanical power or a reactive propulsive thrust, not otherwise provided for","size":1.35},{"_id":"60c719f0fc0abffe762be4bc","id":"Fluid-pressure actuators; hydraulics or pneumatics in general","label":"Fluid-pressure actuators; hydraulics or pneumatics in general","tooltipContent":"Fluid-pressure actuators; hydraulics or pneumatics in general","size":0.68},{"_id":"60c719f0fc0abffe762be4bd","id":"Engineering elements or units; general measures for producing and maintaining effective functioning of machines or installations; thermal insulation in general","label":"Engineering elements or units; general measures for producing and maintaining effective functioning of machines or installations; thermal insulation in general","tooltipContent":"Engineering elements or units; general measures for producing and maintaining effective functioning of machines or installations; thermal insulation in general","size":3.38},{"_id":"60c719f0fc0abffe762be4be","id":"Storing or distributing gases or liquids","label":"Storing or distributing gases or liquids","tooltipContent":"Storing or distributing gases or liquids","size":0.68},{"_id":"60c719f0fc0abffe762be4bf","id":"Combustion apparatus; combustion processes","label":"Combustion apparatus; combustion processes","tooltipContent":"Combustion apparatus; combustion processes","size":0.68}]},{"_id":"60c719f0fc0abffe762be4c0","id":"Physics","label":"Physics","fill":"#7BA1D9","children":[{"_id":"60c719f0fc0abffe762be4c1","id":"Measuring; testing","label":"Measuring; testing","tooltipContent":"Measuring; testing","size":7.75},{"_id":"60c719f0fc0abffe762be4c2","id":"Computing; calculating; counting","label":"Computing; calculating; counting","tooltipContent":"Computing; calculating; counting","size":8.11}]},{"_id":"60c719f0fc0abffe762be4c3","id":"Electricity","label":"Electricity","fill":"#7CDADA","children":[{"_id":"60c719f0fc0abffe762be4c4","id":"Basic electric elements","label":"Basic electric elements","tooltipContent":"Basic electric elements","size":4.05},{"_id":"60c719f0fc0abffe762be4c5","id":"Electric communication technique","label":"Electric communication technique","tooltipContent":"Electric communication technique","size":1.35}]}],"id":"default-regional-treemap","label":"default-regional-treemap"};

/*focus: 'region', //'KI'
            regional_dimension: 'province', //'city, patent, publication, trademark'
            ipr_dimension: 'paten', //
            code: '12',
            viz_type: 'treemap',
            year: 2020,
            modifier_hid: [],
            modifier_iso: []
            vtype: 'treemap'
            */

class AkinViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: {},
            vtype: ''
        };
        //this.getData = this.getData.bind(this);
    }

    componentDidMount(){
       fetch(routes.Explore)
       .then(res => res.json()) 
       .then(
          (res) => {
            this.setState({data: res});
            this.setState({isLoaded : true});
            this.setState({vtype: 'treemap'});
          }
        )

        
       /* INI SALAH KARENA FETCHNYA GAJELAS
       fetch().then(async (data) => {
          let vizData = await axios.get('/api/explore')
            .then(function(res){
              return res.data;
            });
          this.setState({data: vizData});
          this.setState({dataIsReturned : true});
          this.setState({vtype: 'treemap'});
        })*/
        .catch( err => this.setState({error: err}));
      }
    

    getData(ev) {
      //console.log('tes')
      axios.get('/api/explore')
        .then(function(res){
          //console.log(res.data)
          ev.setState({data: res.data});
        });
    }

    //data={RootDatum}
    render() {
      const { error, isLoaded, items } = this.state;

      console.log(this.state.vtype);
      console.log(this.state.data);
      console.log(this.state.isLoaded);
      console.log(DefaultDatum);
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <DataViz
          id={'example-tree-map'}
          vizType={VizType.TreeMap}
          data={DefaultDatum}
        /> 
        );
      }
      
    } 
}


export default AkinViz;

/*if (this.state.vtype=='treemap') {
            return (
                <DataViz
                id={'example-tree-map'}
                vizType={VizType.TreeMap}
                data={this.state.data}
              />
            );
        } else {
            return (
                <h1>TES</h1>
            );
        }  */