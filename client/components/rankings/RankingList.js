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
const list = [
    {name: 'Brian Vaughn', description: 'Software engineer'},
    // And so on...
  ];

class RankingList extends Component {
    render() { (
        <Table
            width={300}
            height={300}
            headerHeight={20}
            rowHeight={30}
            rowCount={list.length}
            rowGetter={({index}) => list[index]}>
            <Column label="Name" dataKey="name" width={100} />
            <Column width={200} label="Description" dataKey="description" />
        </Table>
    )}
}

export default RankingList;