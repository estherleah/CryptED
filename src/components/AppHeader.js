import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Navigation from './Navigation';

// Styles
const styles = StyleSheet.create({
    header: {
        height: 50,
        width: '100%',
    },
});

class AppHeader extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Header 
                    backgroundColor='#567FDE'
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