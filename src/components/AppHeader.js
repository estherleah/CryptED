import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation';
import firebase from 'firebase';

// Styles
const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
    },
    button: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: '#F5FCFF',
    },
});

class AppHeader extends Component {
    // Initial state of toggle showOptions
    state = {
        showOptions: false,
    };

    // Toggles the options buttons.
    toggleOptions() {
        this.state.showOptions ?
            this.setState({ showOptions: false }):
            this.setState({ showOptions: true });
    }

    // Sign out of the application.
    logout() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
        });
    }

    // Render sign out button if toggle is enabled.
    renderOptions() {
        return (this.state.showOptions) ? 
            <Button 
                buttonStyle={styles.button} 
                material-community 
                icon={{name: 'logout', type: 'material-community', color: '#333'}} 
                color='#333333'
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