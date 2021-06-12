import React, {Component} from 'react';
import {DataViz, VizType} from 'react-fast-charts';
import axios from 'axios';
import {Link} from 'react-router-dom';
//import * as d3 from 'd3';

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
/*
   dimension: 'reg', //'reg/ipr'
  focus: 'prv', //'prv, cty, ptn, pub, trd'
  code: '12', //1-34, 1-500an
  vtype: 'treemap',
  year: 2020,
  modifier_hid: [],
  modifier_iso: [],
  data: null*/
class PatentViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dimension: '',
            focus: '',
            code: '',
            vtype: '',
            year: 0,
            modifier_hid: [],
            modifier_iso: [],
            data: null
        };
    }

    render() {
        if (this.state.vtype=='treemap') {
            return (
                <DataViz
                id={'example-tree-map'}
                vizType={VizType.TreeMap}
                data={RootDatum}
              />
            );
        } else {
            return (
                <h1>TES</h1>
            );
        }   
    } 
}

export default PatentViz;