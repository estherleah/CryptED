import React, { Component } from 'react';
import { Text, View, WebView, Dimensions, BackHandler } from 'react-native';
import AppHeader from './AppHeader';
import styles from '../styles';

export default class CryptographyHistory extends Component {
    // Initial state
    state = { width: Dimensions.get('screen').width };

    // Executes before component mounts.
    componentWillMount() {
        // handle android back button press
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.goBack();
            return true;
        });
    }

    // When orientation changes.
    onNavigationStateChange() {
        this.setState({width: Dimensions.get('screen').width});
    }

    render() {
        return (
            <View style={styles.container} onLayout={() => {this.setState({width: Dimensions.get('window').width})}}>
                <AppHeader />
                <WebView 
                    scalesPageToFit={true} 
                    scrollEnabled={false} 
                    javaScriptEnabled={true}
                    source={{uri: 'https://en.wikipedia.org/wiki/History_of_cryptography'}} 
                    style={{width: this.state.width}} 
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
            </View>
        );
    }
}