import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Header, Button, FormInput } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class NewUser extends Component {
    // Initial state
    state = {
        name: '',
        date: '',
    };

    // Method for what happens when press the save button.
    onButtonPress() {
        const { name, date } = this.state;
        if (date != '') {
            this.props.userCreated(name, date);
        }
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
                    <DatePicker
                        date={this.state.date} 
                        mode="date"
                        placeholder="Date of birth" 
                        format="DD-MM-YYYY" 
                        confirmBtnText="Confirm" 
                        cancelBtnText="Cancel" 
                        onDateChange={date => this.setState({date})}
                        style={{width: '100%' - 20, padding: 20}} 
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
                        minDate="01-01-1900"
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