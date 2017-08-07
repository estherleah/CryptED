import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import * as actions from '../actions';
import styles from '../styles';

class Settings extends Component {
    // Initial state
    state = { adminUser: this.props.user.admin };

    // Method for when toggle the admin switch.
    onAdminToggle() {
        this.setState({ adminUser: !this.state.adminUser });
        // user is already an admin and wants to remove admin status
        if (this.props.user.admin) {
            Alert.alert(
                'Confirmation',
                'Are you sure you no longer wish to be an admin?',
                [
                    {text: 'Cancel', onPress: () => this.setState({adminUser: true}), style: 'cancel'},
                    {text: 'OK', onPress: () => this.props.changeAdmin(!this.props.user.admin)},
                ],
                { onDismiss:() => this.setState({adminUser: true}) }
            )
        }
        // user wants to become an admin
        // TODO: checking before becomes admin (e.g. checking age)
        else {
            Alert.alert(
                'Confirmation',
                'Are you sure you would like to be an admin?',
                [
                    {text: 'Cancel', onPress: () => this.setState({adminUser: false}), style: 'cancel'},
                    {text: 'OK', onPress: () => this.props.changeAdmin(!this.props.user.admin)},
                ],
                { onDismiss:() => this.setState({adminUser: false}) }
            )
        }
    }

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
                        switchButton={true}
                        switched={this.state.adminUser}
                        onSwitch={this.onAdminToggle.bind(this)}
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