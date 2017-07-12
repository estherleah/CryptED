import { DrawerNavigator } from 'react-navigation';
import PuzzleList from './PuzzleList';
import Cryptography from './Cryptography';

const Navigation = DrawerNavigator({
    Puzzles: { screen: PuzzleList },
    Cryptography: { screen: Cryptography },
});

export default Navigation;