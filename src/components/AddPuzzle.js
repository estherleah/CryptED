import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormInput, FormValidationMessage, Button } from 'react-native-elements';
import {Select, Option} from "react-native-chooser";
import AppHeader from './AppHeader';
import LogicPuzzles from './LogicPuzzles';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class AddPuzzle extends Component {
    // Method for what happens when press the add button.
    // TODO: validate that there is text in both the problem and solution fields. Also validate level.
    onAddPress() {
        const { problem, solution, notes, rating } = this.props;
        this.props.createNewPuzzle({problem, solution, notes, rating});
        this.props.navigation.navigate('LogicPuzzles');
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
                    <FormValidationMessage>
                        {'Required'}
                    </FormValidationMessage>
                    <FormInput 
                        placeholder={'Solution'} 
                        value={this.props.solution} 
                        onChangeText={value => this.props.formUpdate({ prop: 'solution', value })} 
                    />
                    <FormValidationMessage>
                        {'Required'}
                    </FormValidationMessage>
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
                    <View>
                        {
                            (this.props.problem.length != 0  && this.props.solution.length != 0) ?
                                <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Add' onPress={this.onAddPress.bind(this)} /> :
                                <Button disabled raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Add' onPress={this.onAddPress.bind(this)} />
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