import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import Login from './Login';
import Cryptography from './Cryptography';

const Navigation = TabNavigator({
    Login: { 
        screen: Login,
        navigationOptions: {
            tabBarLabel : 'Login',
        },
    },
    Cryptography: {
        screen: Cryptography,
        navigationOptions: {
            tabBarLabel : 'Cryptography',
        },
    },
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        //inactiveTintColor: '#80CBC4',
        swipeEnabled: true,
        showLabel: true,
        style: {
            //backgroundColor: '#26A69A',
        },
    },
});

export default Navigation;