import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppHeader from './AppHeader';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default class Settings extends Component {
    render() {
        return (
            <View>
                <AppHeader />
            </View>
        );
    }
}