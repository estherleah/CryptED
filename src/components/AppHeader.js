import React, { Component } from 'react';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation';
import firebase from 'firebase';

class AppHeader extends Component {
    logout() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
        });
    }
    render() {
        return (
            <Header 
                backgroundColor='#567FDE'
                leftComponent={<Icon 
                        name='menu' 
                        color='#fff' 
                        onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                    />}
                centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                rightComponent={<Icon 
                        name='logout' 
                        type='material-community' 
                        color='#fff' 
                        onPress = {this.logout.bind(this)}
                    />}
            />
        );
    }
}

export default AppHeader = withNavigation(AppHeader);