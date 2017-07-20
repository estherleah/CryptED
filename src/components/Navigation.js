import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import PuzzleList from './PuzzleList';
import LogicPuzzles from './LogicPuzzles';
import AddPuzzle from './AddPuzzle';
import Settings from './Settings';
import Login from './Login';

const Navigation = DrawerNavigator({
    CryptographyPuzzles: {
        screen: PuzzleList,
        navigationOptions: {
            drawerLabel: 'Cryptography challenges',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
        }
    },
    LogicPuzzles: {
        screen: LogicPuzzles,
        navigationOptions: {
            drawerLabel: 'Logic puzzles',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
        }
    },
    AddPuzzle: {
        screen: AddPuzzle,
        navigationOptions: {
            drawerLabel: 'Add puzzle',
            drawerIcon: () => 
                (<Icon name='plus' type='font-awesome' />),
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: () => 
                (<Icon name='settings' />),
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            drawerLabel: 'Log out',
            drawerIcon: () => 
                (<Icon name='logout' type='material-community' />),
        },
    },
}, {
    drawerWidth: 300,
});

export default Navigation;