import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import CryptographyPuzzles from './CryptographyPuzzles';
import CryptographyHistory from './CryptographyHistory';
import LogicPuzzles from './LogicPuzzles';
import AddPuzzle from './AddPuzzle';
import Settings from './Settings';
import Login from './Login';

const Navigation = DrawerNavigator({
    CryptographyPuzzles: {
        screen: CryptographyPuzzles,
        navigationOptions: {
            drawerLabel: 'Cryptography puzzles',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
        }
    },
    CryptographyHistory: {
        screen: CryptographyHistory,
        navigationOptions: {
            drawerLabel: 'History of cryptography',
            drawerIcon: () => 
                (<Icon name='history' type='material-community' />),
        }
    },
    LogicPuzzles: {
        screen: LogicPuzzles,
        navigationOptions: {
            drawerLabel: 'Logic puzzles',
            drawerIcon: () => 
                (<Icon name='puzzle-piece' type='font-awesome' />),
        }
    },
    AddPuzzle: {
        screen: AddPuzzle,
        navigationOptions: {
            drawerLabel: 'Add puzzle',
            drawerIcon: () => 
                (<Icon name='plus' type='octicon' />),
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            drawerLabel: 'Settings',
            drawerIcon: () => 
                (<Icon name='settings' type='material-community' />),
        }
    },
    Logout: {
        screen: Login,
        navigationOptions: {
            drawerLabel: 'Log out',
            drawerIcon: () => 
                (<Icon name='logout' type='material-community' />),
        }
    },
}, {
    drawerWidth: 300,
});

export default Navigation;