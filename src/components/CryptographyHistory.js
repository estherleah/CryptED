import React, { Component } from 'react';
import { Text, View, WebView, Dimensions } from 'react-native';
import AppHeader from './AppHeader';
import styles from '../styles';

export default class Settings extends Component {
    // Initial state
    state = { width: Dimensions.get('screen').width };

    onNavigationStateChange() {
        this.setState({width: Dimensions.get('screen').width})
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