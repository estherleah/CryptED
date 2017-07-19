import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import AppHeader from './AppHeader';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    body: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        padding: 20,
    },
    more: {
        textAlign: 'center',
        marginTop: 45,
    },
});

export default class Cryptography extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <Text style={styles.title}>Caesar ciphers</Text>
                 <Text style={styles.body}>
                     QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD
                </Text>
                <FormInput 
                    placeholder={'Solution'} 
                />
                <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Submit' />
                <TouchableOpacity>
                    <Text style={styles.more}>
                        Learn more about Caesar ciphers...
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}