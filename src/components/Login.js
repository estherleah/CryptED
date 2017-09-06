import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Modal, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Header, Button, FormInput, Icon } from 'react-native-elements';
import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class Login extends Component {
    // Added to remove timer warning when using firebase.
    constructor() {
        super();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    // Initial state
    state = {
        email: '',
        password: '',
        error: '',
        name: '',
        date: '',
        loading: false,
        newUser: false,
        forgot: false,
    };

    // Ensures application is logged out before login screen is rendered.
    componentWillMount() {
        firebase.auth().signOut();
        this.setState({
            loggedIn: false,
        });
    }
    
    // Method for what happens when press the login button.
    onLoginPress() {
        const { email, password } = this.state;
        this.setState({error: '', loading: true});
        // Sign in using firebase
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onAuthSuccess.bind(this))
        .catch(this.onAuthFailed.bind(this));
    }

    // View sign up modal.
    onSignUpButtonPress() {
        this.setState({newUser: true});
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
    
    // Actual sign up method for a new user.
    onSignUpPress() {
        const { email, password, repeat, name, date } = this.state;
        this.setState({error: '', loading: true});
        if (date != '' && name != '' && password != '') {
            if (password == repeat) {
                // Create user with firebase
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // add user data
                    const { currentUser } = firebase.auth();
                    firebase.database().ref(`/users/${currentUser.uid}`)
                    .set({
                        score: 0,
                        admin: false,
                        solved: '',
                        name,
                        date
                    });
                })
                .then(this.onAuthSuccess.bind(this))
                .catch(this.onAuthFailed.bind(this));
            } else {
                this.setState({
                    error: 'Passwords do not match',
                    loading: false,
                });
            }
        }
        else {
            this.setState({
                error: 'Please fill out all fields',
                loading: false,
            });
        }
    }

    // If authorization fails, set the error and set loading to false.
    onAuthFailed() {
        this.setState({
            error: 'Authentication failed',
            loading: false,
        });
    }

    onForgotPassword() {
        const { email } = this.state;
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            this.setState({forgot: false});
            alert("Message sent");
        })
        .catch((error) => console.log(error));
    }

    // Add the loader to show that it is loading.
    renderLoader() {
        return (this.state.loading) ? 
            <ActivityIndicator size='large' /> :
            <View>
                <Button containerViewStyle={{marginBottom: 15}} textStyle={{color: 'black'}} raised backgroundColor='#ff6d00' title='LOGIN' onPress={this.onLoginPress.bind(this)} />
                <Button containerViewStyle={{marginBottom: 15}} textStyle={{color: 'black'}} raised backgroundColor='#ff6d00' title='SIGN UP' onPress={this.onSignUpButtonPress.bind(this)} />
                <TouchableOpacity
                    onPress={() => {this.setState({forgot: true})}}
                >
                    <Text style={styles.forgot}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.scroll}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <Header backgroundColor='#673ab7'
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>Log in or create an account</Text>
                    <FormInput 
                        onChangeText={email => this.setState({email})}
                        textInputRef={this.state.email}  
                        placeholder={'Email'} 
                        keyboardType={'email-address'}
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

                    {/* Modal for new user */}
                    <Modal
                        visible={this.state.newUser}
                        onRequestClose={() => this.setState({newUser: false})}
                        animationType='none'
                    >
                        <View style={styles.container}>
                            <KeyboardAvoidingView style={styles.scroll}>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                                <View style={styles.header}>
                                    <Header 
                                        backgroundColor='#673ab7'
                                        leftComponent={<Icon 
                                            name='arrow-back' 
                                            color='#fff' 
                                            onPress={() => this.setState({newUser: false})} 
                                        />} 
                                        centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                    />
                                </View>
                                <Text style={styles.title}>New user</Text>
                                <FormInput 
                                    onChangeText={email => this.setState({email})}
                                    textInputRef={this.state.email}  
                                    placeholder={'Email'} 
                                    keyboardType={'email-address'}
                                />
                                <FormInput 
                                    onChangeText={password => this.setState({password})}
                                    textInputRef={this.state.password}  
                                    placeholder={'Password'} 
                                    secureTextEntry={true} 
                                />
                                <FormInput 
                                    onChangeText={repeat => this.setState({repeat})}
                                    textInputRef={this.state.repeat}  
                                    placeholder={'Repeat password'} 
                                    secureTextEntry={true} 
                                />
                                <FormInput 
                                    autoCapitalize={'words'}
                                    onChangeText={name => this.setState({name})}
                                    textInputRef={this.state.name}  
                                    placeholder={'Name'} 
                                />
                                <DatePicker
                                    date={this.state.date} 
                                    mode="date"
                                    placeholder="Date of birth" 
                                    confirmBtnText="Confirm" 
                                    cancelBtnText="Cancel" 
                                    onDateChange={date => this.setState({date})}
                                    style={{width: '100%' - 20, padding: 20, paddingTop: 10}} 
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderBottomWidth: 1,
                                            alignItems: 'flex-start',
                                        },
                                        placeholderText: {
                                            color: '#86939e',
                                        },
                                        dateText: {
                                            color: '#86939e',
                                        },
                                    }} 
                                    maxDate={new Date()}
                                    minDate="1900-01-01"
                                />
                                <Text style={styles.error}>
                                    {this.state.error}
                                </Text>
                                {(this.state.loading) ? 
                                    <ActivityIndicator size='large' /> :
                                    <View>
                                        <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='SIGN UP' onPress={this.onSignUpPress.bind(this)} />
                                    </View>}
                            </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                    {/* End of modal */}

                    {/* Modal for forgot password */}
                    <Modal
                        visible={this.state.forgot}
                        onRequestClose={() => this.setState({forgot: false})}
                        animationType='none'
                    >
                        <View style={styles.container}>
                            <KeyboardAvoidingView style={styles.scroll}>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                                <View style={styles.header}>
                                    <Header 
                                        backgroundColor='#673ab7'
                                        leftComponent={<Icon 
                                            name='arrow-back' 
                                            color='#fff' 
                                            onPress={() => this.setState({forgot: false})} 
                                        />} 
                                        centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                    />
                                </View>
                                <Text style={styles.title}>Password reset</Text>
                                <Text style={styles.forgot}>Please enter your email address to receive a password reset link</Text>
                                <FormInput 
                                    onChangeText={email => this.setState({email})}
                                    textInputRef={this.state.email}  
                                    placeholder={'Email'} 
                                    keyboardType={'email-address'}
                                />
                                <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='RESET' onPress={this.onForgotPassword.bind(this)} />
                            </ScrollView>
                            </KeyboardAvoidingView>
                        </View>
                    </Modal>
                    {/* End of modal */}

                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default connect(null, actions)(Login);