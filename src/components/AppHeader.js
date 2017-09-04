import React, { Component } from 'react';
import { View } from 'react-native';
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
                    leftComponent={<Icon 
                            name='menu' 
                            color='#fff' 
                            onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                        />}
                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                />
            </View>
        );
    }
}

export default AppHeader = withNavigation(AppHeader);