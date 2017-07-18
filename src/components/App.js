/**
 * CryptED
 * An educational app for teaching cryptography 
 * and other problem solving skills.
 * Created using React Native: https://github.com/facebook/react-native
 * @author Esther Leah Morrison
 * @version 1.0
 * @license 
 */

import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import Login from './Login';
import Navigation from './Navigation';
import reducers from '../reducers/Reducer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const store = createStore(reducers, applyMiddleware(Thunk));

export default class App extends Component {

    state = { loggedIn: null };

    // Connect to firebase. Do this before the component is mounted.
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBG8ASDzhtL0y2aek6Id65nTJqZAkbEUVo",
            authDomain: "crypted-b0db8.firebaseapp.com",
            databaseURL: "https://crypted-b0db8.firebaseio.com",
            projectId: "crypted-b0db8",
            storageBucket: "crypted-b0db8.appspot.com",
            messagingSenderId: "413084766892"
        });

        firebase.auth().onAuthStateChanged((user) => {
            (user) ? 
                this.setState({ loggedIn: true }) : 
                this.setState({ loggedIn: false });
        });
    }

    // Initial view of the application depending on if logged in or not.
    renderInitialView() {
        switch (this.state.loggedIn) {
            case true:
                return <Navigation />;
            case false:
                return <Login />;
            default:
                return <ActivityIndicator size='large' />;
        }
    }

    render() {
        return (
            <Provider store={store} style={styles.container}>
                    {this.renderInitialView()}
            </Provider>
        );
    }
}