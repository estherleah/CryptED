import React, { Component } from 'react';
import { View } from 'react-native';
import AppHeader from './AppHeader';
import styles from '../styles';

export default class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
            </View>
        );
    }
}