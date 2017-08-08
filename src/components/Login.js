import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Header, Button, FormInput } from 'react-native-elements';
import firebase from 'firebase';
import styles from '../styles';

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
                // create new user
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    // add initial user data to database
                    // TODO: admin user
                    .then(function(firebaseUser) {
                        firebase.database().ref(`/users/${firebaseUser.uid}/score`).set(0)
                        firebase.database().ref(`/users/${firebaseUser.uid}/admin`).set(false)
                        firebase.database().ref(`/users/${firebaseUser.uid}/solved`).set('')
                    })
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
            <Button raised backgroundColor='#567FDE' title='Login' onPress={this.onButtonPress.bind(this)} />;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Header backgroundColor='#567FDE'
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>Log in or create an account</Text>
                    <FormInput 
                        onChangeText={email => this.setState({email})}
                        textInputRef={this.state.email}  
                        placeholder={'Email'} 
                    />
                    <FormInput 
                        onChangeText={password => this.setState({password})}
                        textInputRef={this.state.password}  
                        placeholder={'Password'} 
                        secureTextEntry={true} 
                    />
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                    <View style={{width: '100%'}}>
                        {this.renderLoader()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}