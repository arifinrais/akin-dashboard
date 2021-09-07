//import 'react-virtualized/styles.css';

// You can import any component you want as a named export from 'react-virtualized', eg
//import {Column, Table} from 'react-virtualized';

// But if you only use a few react-virtualized components,
// And you're concerned about increasing your application's bundle size,
// You can directly import only the components you need, like so:
//import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
//import List from 'react-virtualized/dist/commonjs/List';
import {Column, Table} from 'react-virtualized';
import 'react-virtualized/styles.css';
/*const list = [
    {name: 'Brian Vaughn', description: 'Software engineer'},
    // And so on...
  ];*/
/*
 color: String,
    rank: Number,
    name: String,
    index: Number,
    growth: Number
});

const iprRecord = new Schema({
    color: String,
    rank: Number,
    code: String,
    name: String,
    index: Number
*/

const RankingList = props => {
    const getColor = (clr) => {
        return <div style={{color: clr, backgroundColor: clr}}>-</div>
    }
    if (props.focus=='reg') {
        let list = props.data['regList'];
        let name = props.reg_dimension=='prov'? 'Province' : props.reg_dimension=='city'? 'City' : '';
        return (<Table
            width={650}
            height={500}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({index}) => list[index]}>
            <Column cellRenderer={({ cellData }) => getColor(cellData)} dataKey='color' width={50} />
            <Column label="Rank" dataKey="rank" width={100} />
            <Column label={name} dataKey="name" width={300} />
            <Column label="KCI" dataKey="index" width={100} />
            <Column label="Growth" dataKey="growth" width={100} />
        </Table>)
    } else if (props.focus=='ipr') {
        let list = props.data['iprList'];
        let name = props.ipr_dimension=='ptn'? 'Patent' : props.ipr_dimension=='pub'? 'Publication' : 
            props.ipr_dimension=='trd'? 'Trademark' : '';
        let code = props.ipr_dimension=='ptn'? 'IPC Code' : props.ipr_dimension=='pub'? 'KRI Code' : 
            props.ipr_dimension=='trd'? 'NCL Code' : '';
        return (<Table
            width={650}
            height={500}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({index}) => list[index]}>
            <Column cellRenderer={({ cellData }) => getColor(cellData)} dataKey='color' width={50} />
            <Column label="Rank" dataKey="rank" width={100} />
            <Column label={code} dataKey="code" width={100} />
            <Column label={name} dataKey="name" width={300} />
            <Column label="IPCI" dataKey="index" width={100} />
        </Table>)
    } else {
        return <h1>ERROR!</h1>
    }
}

export default RankingList;