import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
        const { problem, solution, notes } = this.props;
        this.props.createNewPuzzle({problem, solution, notes});
        this.props.navigation.navigate('LogicPuzzles');
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
    const { problem, solution, notes } = state;
    return { problem, solution, notes };
}

export default connect(mapStateToProps, actions)(AddPuzzle);