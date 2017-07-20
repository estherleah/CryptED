import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Header, Button, FormInput } from 'react-native-elements';
import firebase from 'firebase';

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
    form: {
        height: 60,
        width: 300,
    },
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
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

    // Ensures application is logged out before login screen is rendered.
    componentWillMount() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
        });
    }
    
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
            <Button large backgroundColor='#567FDE' raised title='Login' onPress={this.onButtonPress.bind(this)} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Header backgroundColor='#567FDE'
                        centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                    />
                    <Text style={styles.welcome}>Log in or create an account</Text>
                    <FormInput 
                        style={styles.form} 
                        onChangeText={email => this.setState({email})}
                        textInputRef={this.state.email}  
                        placeholder={'Email'} 
                    />
                    <FormInput 
                        style={styles.form} 
                        onChangeText={password => this.setState({password})}
                        textInputRef={this.state.password}  
                        placeholder={'Password'} 
                        secureTextEntry={true} 
                    />
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                    <View>
                        {this.renderLoader()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}