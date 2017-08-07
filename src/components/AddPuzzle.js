import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Select, Option } from "react-native-chooser";
import AppHeader from './AppHeader';
import LogicPuzzles from './LogicPuzzles';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class AddPuzzle extends Component {
    // Initial state
    state = {
        errors: []
    };

    // Method for what happens when press the add button. Validate input and add puzzle.
    onAddPress() {
        const { problem, solution, notes, rating } = this.props;
        // reset state so no errors
        this.setState({ errors: [] });
        // array to store errors.
        let formErrors = [];
        // check if valid - if not valid then add an error
        if (this.props.problem.length == 0) {
            formErrors.push('Please enter a valid problem');
        }
        if (this.props.solution.length == 0) {
            formErrors.push('Please enter a valid solution');
        }
        if (this.props.rating == 0) {
            formErrors.push('Please pick a valid level');
        }
        // if no errors add new puzzle
        if (formErrors.length == 0) {
            this.props.createNewPuzzle({problem, solution, notes, rating});
            this.props.navigation.navigate('LogicPuzzles');
        }
        // if errors then add to the state
        else {
            this.setState({ errors: formErrors });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <Text style={styles.title}>Add your own puzzle</Text>
                    <FormInput 
                        placeholder={'Problem'} 
                        value={this.props.problem} 
                        onChangeText={value => this.props.formUpdate({ prop: 'problem', value })} 
                    />
                    <FormInput 
                        placeholder={'Solution'} 
                        value={this.props.solution} 
                        onChangeText={value => this.props.formUpdate({ prop: 'solution', value })} 
                    />
                    <FormInput 
                        placeholder={'Notes'} 
                        value={this.props.notes} 
                        onChangeText={value => this.props.formUpdate({ prop: 'notes', value })} 
                    />
                    <Select
                        onSelect = {value => this.props.formUpdate({ prop: 'rating', value })} 
                        selectedValue={this.props.rating} 
                        selected = {this.props.rating}
                        defaultText  = 'Level' 
                        style = {styles.select} 
                        backdropStyle  = {{backgroundColor : '#F5FCFF'}} 
                        optionListStyle = {{backgroundColor : '#F5FCFF'}} 
                    >
                        <Option value = {1}>Very easy</Option>
                        <Option value = {2}>Easy</Option>
                        <Option value = {3}>Medium</Option>
                        <Option value = {4}>Hard</Option>
                        <Option value = {5}>Very hard</Option>
                    </Select>
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Add' onPress={this.onAddPress.bind(this)} />
                    <View>
                        {
                            (this.state.errors.length != 0) ?
                                this.state.errors.map((error, index) => <Text style={styles.errorList} key={index}>{error}</Text>) :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    const { problem, solution, notes, rating } = state;
    return { problem, solution, notes, rating };
}

export default connect(mapStateToProps, actions)(AddPuzzle);