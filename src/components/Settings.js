import React, { Component } from 'react';
import { Text, View, Alert, ScrollView, Modal } from 'react-native';
import { List, ListItem, Icon, Header } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import * as actions from '../actions';
import styles from '../styles';

class Settings extends Component {
    // Initial state
    state = {
        adminUser: this.props.user.admin,
        adminVisible: false,
    };

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
                    {text: 'OK', onPress: () => {
                        // remove admin status and hide admin settings
                        this.props.changeAdmin(!this.props.user.admin);
                        this.setState({adminVisible: false});
                    }},
                ],
                { onDismiss: () => this.setState({adminUser: true}) }
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
                    {text: 'OK', onPress: () => {
                        this.props.changeAdmin(!this.props.user.admin);
                        this.setState({adminUser: true});
                    }},
                ],
                { onDismiss: () => this.setState({adminUser: false}) }
            )
        }
    }

    // Method for when press on admin.
    onAdminPress() {
        // only show admin settings if user is an admin
        if (this.props.user.admin) {
            this.setState({adminVisible: true});
        }
        // otherwise toggle admin
        else {
            this.onAdminToggle();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <List containerStyle={styles.list}>
                        <ListItem 
                            hideChevron={true} 
                            title='Score'
                            leftIcon={{name: 'trophy', type: 'evilicon'}}
                            badge={{ value: this.props.user.score, containerStyle: styles.badge }}
                        />
                        <ListItem 
                            hideChevron={!this.props.user.admin} 
                            title={(this.props.user.admin) ? 'Admin options' : 'Admin'} 
                            leftIcon={{name: 'user', type: 'evilicon'}}
                            switchButton={!this.props.user.admin}
                            switched={this.state.adminUser}
                            onSwitch={this.onAdminToggle.bind(this)}
                            onPress={this.onAdminPress.bind(this)}
                        />
                    </List>

                    {/* Modal for admin settings */}
                    <Modal
                        visible={this.state.adminVisible}
                        onRequestClose={() => this.setState({adminVisible: false})}
                        animationType='none'
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Header 
                                    backgroundColor='#567FDE'
                                    leftComponent={<Icon 
                                        name='arrow-back' 
                                        color='#fff' 
                                        onPress={() => this.setState({adminVisible: false})} 
                                    />} 
                                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                />
                            </View>
                            <List containerStyle={styles.list}>
                                <ListItem 
                                    hideChevron={true} 
                                    title={'Admin status'} 
                                    leftIcon={{name: 'user', type: 'evilicon'}}
                                    switchButton={true}
                                    switched={this.state.adminUser}
                                    onSwitch={this.onAdminToggle.bind(this)}
                                />
                            </List>
                        </View>
                    </Modal>
                </ScrollView>
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