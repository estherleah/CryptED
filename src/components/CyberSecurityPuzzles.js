import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import AppHeader from './AppHeader';
import styles from '../styles';

export default class CyberSecurityPuzzles extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                </ScrollView>
            </View>
        );
    }
}