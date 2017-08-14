import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header, Button, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class NewUser extends Component {
    // Initial state
    state = {
        name: '',
    };

    // Method for what happens when press the save button.
    onButtonPress() {
        const { name } = this.state;
        this.props.userCreated(name);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View style={styles.header}>
                        <Header backgroundColor='#567FDE'
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>New user</Text>
                    <FormInput 
                        onChangeText={name => this.setState({name})}
                        textInputRef={this.state.name}  
                        placeholder={'Name'} 
                    />
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Save' onPress={this.onButtonPress.bind(this)} />
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        newUser: state.newUser,
    };
}

export default connect(mapStateToProps, actions)(NewUser);