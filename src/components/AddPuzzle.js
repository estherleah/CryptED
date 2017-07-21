import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
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
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Add' onPress={this.onAddPress.bind(this)} />
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