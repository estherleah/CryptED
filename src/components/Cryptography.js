import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MKTextField, getTheme } from 'react-native-material-kit';

const theme = getTheme();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        margin: 10,
        marginBottom: 25,
    },
    content: {
        fontSize: 20,
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
    },
    field: {
        width: 500,
        height: 60,
        fontSize: 20,
    },
    learnMore: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 45,
    },
    textArea: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default class Cryptography extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Caesar ciphers</Text>
                <View style={styles.textArea}>
                    <Text style={styles.content}>
                        QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD
                    </Text>
                </View>
                <View style={styles.textArea}>
                    <MKTextField
                        textInputStyle={styles.field} 
                        placeholder={'Solution:'} 
                    />
                </View>
                <View style={styles.textArea}>
                    <TouchableOpacity>
                        <Text style={styles.learnMore}>Learn more about Caesar ciphers...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}