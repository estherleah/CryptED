import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation';
import firebase from 'firebase';

// Styles
const styles = StyleSheet.create({
    header: {
        height: 75,
        width: '100%',
    },
});

class AppHeader extends Component {
    state = {
        showOptions: false,
    };

    toggleOptions() {
        this.state.showOptions ?
            this.setState({ showOptions: false }):
            this.setState({ showOptions: true });
    }

    logout() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
        });
    }

    renderOptions() {
        return (this.state.showOptions) ? 
            <Button 
                containerViewStyle={{alignItems: 'flex-end'}}
                color='#333333'
                backgroundColor='#F5FCFF' 
                title='Sign out' 
                onPress={this.logout.bind(this)} 
            /> :
            null;
    }

    render() {
        return (
            <View style={styles.header}>
                <Header 
                    backgroundColor='#567FDE'
                    leftComponent={<Icon 
                            name='menu' 
                            color='#fff' 
                            onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                        />}
                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                    rightComponent={<Icon 
                            name='dots-vertical' 
                            type='material-community' 
                            color='#fff' 
                            onPress = {this.toggleOptions.bind(this)}
                        />}
                />
                <View>
                    {this.renderOptions()}
                </View>
            </View>
        );
    }
}

export default AppHeader = withNavigation(AppHeader);