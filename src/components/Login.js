import React, { Component } from 'react';
import { Container, Header, Title, Subtitle, Content, Button, Left, Right, Body, Icon, Item, Form, Input } from 'native-base';
import { StyleSheet, View, Text,  ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Navigation from './Navigation';

const styles = StyleSheet.create({
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
    },
    button: {
        color: 'white',
    },
    error: {
        color: 'red',
        textAlign: 'center',
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
            (<Button full onPress={this.onButtonPress.bind(this)}>
                <Text style={styles.button}>Login</Text>
            </Button>);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>CryptED</Title>
                        <Subtitle>Login</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text style={styles.welcome}>Log in or create an account</Text>
                    <Form>
                        <Item>
                            <Input 
                                text={this.state.email} 
                                onTextChange={email => this.setState({email})} 
                                placeholder="Email" 
                            />
                        </Item>
                        <Item>
                            <Input 
                                text={this.state.password} 
                                onTextChange={password => this.setState({password})} 
                                placeholder="Password" 
                                secureTextEntry={true} 
                            />
                        </Item>
                    </Form>
                    <Text style={styles.error}>
                        {this.state.error}
                    </Text>
                    <View>
                        {this.renderLoader()}
                    </View>
                </Content>
            </Container>
        );
    }
}