import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { List, ListItem, Icon, Badge } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import * as actions from '../actions';
import styles from '../styles';

class Settings extends Component {
    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListItem 
                        hideChevron={true} 
                        title='Score'
                        leftIcon={{name: 'trophy', type: 'evilicon'}}
                        badge={{ value: this.props.user.score, containerStyle: styles.badge }}
                    />
                    <ListItem 
                        hideChevron={true} 
                        title='Admin'
                        leftIcon={{name: 'user', type: 'evilicon'}}
                        badge={{ value: JSON.stringify(this.props.user.admin), containerStyle: styles.badge }}
                    />
                </List>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, actions)(Settings);