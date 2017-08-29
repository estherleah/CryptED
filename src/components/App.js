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
import { ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import Thunk from 'redux-thunk';
import Login from './Login';
import Navigation from './Navigation';
import reducers from '../reducers/Reducer';
import * as actions from '../actions';
import styles from '../styles';

// Store
const store = createStore(reducers, applyMiddleware(Thunk));

class App extends Component {
    // Added to remove timer warning when using firebase.
    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    // Initial state before login.
    state = { loggedIn: null };

    // Connect to firebase. Do this before the component is mounted.
    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyBG8ASDzhtL0y2aek6Id65nTJqZAkbEUVo",
            authDomain: "crypted-b0db8.firebaseapp.com",
            databaseURL: "https://crypted-b0db8.firebaseio.com",
            storageBucket: "crypted-b0db8.appspot.com",
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
                this.props.loadUser();
                // load puzzles so available if then lose internet connection
                this.props.loadPuzzles();
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

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        newUser: state.newUser,
    };
}

// Connect store with app so can load initial user data into store.
// see https://github.com/reactjs/react-redux/issues/390
const connectWithStore = (store, App) => {
    var ConnectedApp = connect(mapStateToProps, actions)(App)
    return function (props) {
        return <ConnectedApp {...props} store={store} />
    }
}

export default connectWithStore(store, App);