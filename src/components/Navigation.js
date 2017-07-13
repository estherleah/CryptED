import { DrawerNavigator } from 'react-navigation';
import Cryptography from './Cryptography';
import PuzzleList from './PuzzleList';

const Navigation = DrawerNavigator({
    Cryptography: { screen: Cryptography },
    Puzzles: { screen: PuzzleList },
}, {
    drawerWidth: 300,
});

export default Navigation;