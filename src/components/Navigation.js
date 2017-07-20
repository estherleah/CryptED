import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import PuzzleList from './PuzzleList';
import Settings from './Settings';
import Login from './Login';

const Navigation = DrawerNavigator({
    Puzzles: {
        screen: PuzzleList,
        navigationOptions: {
            drawerLabel: 'Challenges',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
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