import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Puzzles from './Puzzles';
import CryptographyHistory from './CryptographyHistory';
import AddPuzzle from './AddPuzzle';
import Leaderboard from './Leaderboard';
import Settings from './Settings';
import Login from './Login';

const Navigation = DrawerNavigator({
    Puzzles: {
        screen: Puzzles,
        navigationOptions: {
            drawerLabel: 'Puzzles',
            drawerIcon: () => 
                (<Icon name='puzzle-piece' type='font-awesome' />),
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
    AddPuzzle: {
        screen: AddPuzzle,
        navigationOptions: {
            drawerLabel: 'Add puzzle',
            drawerIcon: () => 
                (<Icon name='plus' type='octicon' />),
        }
    },
    Leaderboard: {
        screen: Leaderboard,
        navigationOptions: {
            drawerLabel: 'Leaderboard',
            drawerIcon: () => 
                (<Icon name='trophy' type='entypo' />),
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
    contentComponent: props => <ScrollView><DrawerItems {...props} /></ScrollView>,
    contentOptions: {
        activeTintColor: '#9a67ea'
    }
});

export default Navigation;