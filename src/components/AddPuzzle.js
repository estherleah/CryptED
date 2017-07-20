import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import AppHeader from './AppHeader';
import { connect } from 'react-redux';
import * as actions from '../actions';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        padding: 20,
    },
});

class AddPuzzle extends Component {

    onAddPress() {
        const { problem, solution, notes } = this.props;
        this.props.createNewPuzzle({problem, solution, notes});
        this.props.navigation.navigate('PuzzleList');
    }

    render() {
        return (
            <View style={styles.container}>
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