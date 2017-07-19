import { DrawerNavigator } from 'react-navigation';
import Cryptography from './Cryptography';
import PuzzleList from './PuzzleList';
import Settings from './Settings';

const Navigation = DrawerNavigator({
    Cryptography: { screen: Cryptography },
    Puzzles: { screen: PuzzleList },
    Settings: { screen: Settings },
}, {
    drawerWidth: 300,
});

export default Navigation;