import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Cryptography from './Cryptography';
import PuzzleList from './PuzzleList';
import Settings from './Settings';

const Navigation = DrawerNavigator({
    Cryptography: {
        screen: Cryptography,
        navigationOptions: {
            drawerLabel : 'Cryptography',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
        }
    },
    Puzzles: {
        screen: PuzzleList,
        navigationOptions: {
            drawerLabel : 'Puzzles',
            drawerIcon: () => 
                (<Icon name='list' />),
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            drawerLabel : 'Settings',
            drawerIcon: () => 
                (<Icon name='settings' />),
        }
    },
}, {
    drawerWidth: 300,
});

export default Navigation;