import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation';
import styles from '../styles';

class AppHeader extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Header 
                    backgroundColor='#673ab7'
                    leftComponent={
                        <TouchableOpacity
                            style={{width: 40, height: 30}}
                            onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                        >
                            <Icon 
                                name='menu' 
                                color='#fff' 
                            />
                        </TouchableOpacity>}
                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                />
            </View>
        );
    }
}

export default AppHeader = withNavigation(AppHeader);