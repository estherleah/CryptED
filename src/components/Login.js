import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { MKTextField, MKButton } from 'react-native-material-kit';
import firebase from 'firebase';

// Create login button.
const LoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();

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
    field: {
        width: 250,
        height: 40,
    },
    button: {
        marginTop: 20,
    },
    error: {
        marginTop: 15,
        fontSize: 16,
        color: 'red',
        alignSelf: 'center',
    },
});

export default class Login extends Component {
    // Initial state
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };
    
    // Method for what happens when press the login button.
    onButtonPress() {
        const { email, password } = this.state;
        this.setState({error: '', loading: true});

        // Sign in using firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onAuthSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onAuthSuccess.bind(this))
                    .catch(this.onAuthFailed.bind(this));
            });
    }

    // When authorization is successful, set the state back to the default.
    onAuthSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });
    }

    // If authorization fails, set the error and set loading to false.
    onAuthFailed() {
        this.setState({
            error: 'Authentication failed',
            loading: false,
        });
    }

    // Add the loader to show that it is loading.
    renderLoader() {
        return (this.state.loading) ? 
            <ActivityIndicator size='large' /> :
            <LoginButton onPress={this.onButtonPress.bind(this)} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Log in or create an account</Text>
                <MKTextField
                    text={this.state.email} 
                    onTextChange={email => this.setState({email})} 
                    textInputStyle={styles.field} 
                    placeholder={'Email'} 
                />
                <MKTextField
                    text={this.state.password} 
                    onTextChange={password => this.setState({password})} 
                    textInputStyle={styles.field} 
                    placeholder={'Password'} 
                    password={true}
                />
                <Text style={styles.error}>
                    {this.state.error}
                </Text>
                <View style={styles.button}>
                    {this.renderLoader()}
                </View>
            </View>
        );
    }
}