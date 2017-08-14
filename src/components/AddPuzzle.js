import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { Select, Option } from 'react-native-chooser';
import RadioForm from 'react-native-simple-radio-button';
import AppHeader from './AppHeader';
import LogicPuzzles from './LogicPuzzles';
import CyberSecurityPuzzles from './CyberSecurityPuzzles';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class AddPuzzle extends Component {
    // Initial state
    state = {
        errors: [],
        type: 'text',
        category: '',
    };

    // Method for what happens when press the add button. Validate input and add puzzle.
    onAddPress() {
        const { problem, solution, notes, rating, options } = this.props;
        const { type, category } = this.state;
        // reset state so no errors
        this.setState({ errors: [] });
        // array to store errors
        let formErrors = [];
        // check have picked a valid category
        if (this.state.category == '') {
            formErrors.push('Please select a category');
        }
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
        // check errors in multiple choice options
        if (this.state.type == 'multi') {
            if (this.props.options.A.length == 0 || this.props.options.B.length == 0 ||
                this.props.options.C.length == 0 || this.props.options.D.length == 0) {
                    formErrors.push('Please add valid solution options');
            }
        }
        // if no errors add new puzzle
        if (formErrors.length == 0) {
            // if text puzzle
            if (this.state.type == 'text') {
                this.props.createNewPuzzle({problem, solution, notes, rating, options: [], type, category});
            }
            // if multiple choice puzzle
            else {
                this.props.createNewPuzzle({problem, solution, notes, rating, options, type, category});
            }
            // navigate to list of puzzles of the category that was just added
            (this.state.category == 'logic') ? 
                this.props.navigation.navigate('LogicPuzzles') :
                this.props.navigation.navigate('CyberSecurityPuzzles');
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
                    <View>
                        {(this.state.errors.length != 0) ?
                            this.state.errors.map((error, index) => <Text style={styles.errorList} key={index}>{error}</Text>) :
                            null}
                    </View>
                    <RadioForm 
                        formHorizontal = {true}
                        radio_props = {[
                            {label: 'Text', value: 'text'},
                            {label: 'Multiple choice', value: 'multi'}
                        ]}
                        initial = {0}
                        onPress = {value => this.setState({type: value})} 
                        buttonColor = '#567FDE' 
                        buttonSize = {10} 
                        style = {styles.radio} 
                    />
                    <Select
                        transparent 
                        onSelect = {value => this.setState({category: value})} 
                        selectedValue = {this.state.category} 
                        selected = {this.state.category} 
                        defaultText  = 'Please select a category' 
                        style = {styles.select} 
                        backdropStyle  = {styles.selectBackdrop} 
                        optionListStyle = {[styles.selectOptions, {height: 80}]} 
                        textStyle = {{marginLeft: -10}} 
                        indicator = 'down' 
                        indicatorColor = 'gray'
                    >
                        <Option value = 'cybersecurity'>Cyber security puzzle</Option>
                        <Option value = 'logic'>Logic puzzle</Option>
                    </Select>
                    <FormInput 
                        multiline={true} 
                        placeholder={'Problem'} 
                        value={this.props.problem} 
                        onChangeText={value => this.props.formUpdate({ prop: 'problem', value })} 
                    />
                    {
                        (this.state.type == 'text') ?
                            <FormInput 
                                placeholder={'Solution'} 
                                value={this.props.solution} 
                                onChangeText={value => this.props.formUpdate({ prop: 'solution', value })} 
                            /> :
                            <View>
                                <FormInput 
                                    multiline={true} 
                                    placeholder={'Solution option A'} 
                                    value={this.props.options.A} 
                                    onChangeText={value => this.props.optionsUpdate({ position: 'A', value })} 
                                />
                                <FormInput 
                                    multiline={true} 
                                    placeholder={'Solution option B'} 
                                    value={this.props.options.B} 
                                    onChangeText={value => this.props.optionsUpdate({ position: 'B', value })} 
                                />
                                <FormInput 
                                    multiline={true} 
                                    placeholder={'Solution option C'} 
                                    value={this.props.options.C} 
                                    onChangeText={value => this.props.optionsUpdate({ position: 'C', value })} 
                                />
                                <FormInput 
                                    multiline={true} 
                                    placeholder={'Solution option D'} 
                                    value={this.props.options.D} 
                                    onChangeText={value => this.props.optionsUpdate({ position: 'D', value })} 
                                />
                                <Select
                                    transparent 
                                    onSelect = {value => this.props.formUpdate({ prop: 'solution', value })} 
                                    selectedValue = {this.props.solution} 
                                    selected = {this.props.solution} 
                                    defaultText  = 'Please select the correct solution' 
                                    style = {styles.select} 
                                    backdropStyle  = {styles.selectBackdrop} 
                                    optionListStyle = {[styles.selectOptions, {height: 160}]} 
                                    textStyle = {{marginLeft: -10}} 
                                    indicator = 'down' 
                                    indicatorColor = 'gray'
                                >
                                    <Option value = 'A'>Option A</Option>
                                    <Option value = 'B'>Option B</Option>
                                    <Option value = 'C'>Option C</Option>
                                    <Option value = 'D'>Option D</Option>
                                </Select>
                            </View>
                    }
                    <FormInput 
                        multiline={true} 
                        placeholder={'Notes'} 
                        value={this.props.notes} 
                        onChangeText={value => this.props.formUpdate({ prop: 'notes', value })} 
                    />
                    <Select 
                        transparent 
                        onSelect = {value => this.props.formUpdate({ prop: 'rating', value })} 
                        selectedValue = {this.props.rating} 
                        selected = {this.props.rating}
                        defaultText  = 'Level' 
                        style = {styles.select} 
                        backdropStyle  = {styles.selectBackdrop} 
                        optionListStyle = {[styles.selectOptions, {height: 200}]} 
                        textStyle = {{marginLeft: -10}} 
                        indicator = 'down' 
                        indicatorColor = 'gray'
                    >
                        <Option value = {1}>Very easy</Option>
                        <Option value = {2}>Easy</Option>
                        <Option value = {3}>Medium</Option>
                        <Option value = {4}>Hard</Option>
                        <Option value = {5}>Very hard</Option>
                    </Select>
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Add' onPress={this.onAddPress.bind(this)} />
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    const { problem, solution, notes, rating, options } = state;
    return { problem, solution, notes, rating, options };
}

export default connect(mapStateToProps, actions)(AddPuzzle);