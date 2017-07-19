import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import Navigation from './Navigation';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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

export default class PuzzleList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    backgroundColor='#567FDE'
                    leftComponent={<Icon 
                            name='menu' 
                            color='#fff' 
                            onPress={() => this.props.navigation.navigate("DrawerOpen")} 
                        />}
                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                    rightComponent={<Icon 
                            name='settings' 
                            color='#fff' 
                        />}                    
                />
                <Text style={styles.welcome}>Puzzle list page</Text>
            </View>
        );
    }
}