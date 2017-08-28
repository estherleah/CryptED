import React from 'react';
import { ScrollView } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Icon } from 'react-native-elements';
import CryptographyPuzzles from './CryptographyPuzzles';
import CyberSecurityPuzzles from './CyberSecurityPuzzles';
import CryptographyHistory from './CryptographyHistory';
import LogicPuzzles from './LogicPuzzles';
import Puzzles from './Puzzles';
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
    CryptographyPuzzles: {
        screen: CryptographyPuzzles,
        navigationOptions: {
            drawerLabel: 'Cryptography puzzles',
            drawerIcon: () => 
                (<Icon name='key-variant' type='material-community' />),
        }
    },
    CyberSecurityPuzzles: {
        screen: CyberSecurityPuzzles,
        navigationOptions: {
            drawerLabel: 'Cybersecurity puzzles',
            drawerIcon: () => 
                (<Icon name='security' />),
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
});

export default Navigation;