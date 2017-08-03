import React, { Component } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import { FormInput, FormValidationMessage, Button } from 'react-native-elements';
import AppHeader from './AppHeader';
import LogicPuzzles from './LogicPuzzles';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class AddPuzzle extends Component {
    // Method for what happens when press the add button.
    // TODO: validate that there is text in both the problem and solution fields.
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
                    <Picker
                        style={styles.picker}
                        selectedValue={this.props.rating}
                        onValueChange={value => this.props.formUpdate({ prop: 'rating', value })}
                    >
                        <Picker.Item label="Very easy" value={1} />
                        <Picker.Item label="Easy" value={2} />
                        <Picker.Item label="Medium" value={3} />
                        <Picker.Item label="Hard" value={4} />
                        <Picker.Item label="Very hard" value={5} />
                    </Picker>
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