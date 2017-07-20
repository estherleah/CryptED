import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';
import * as actions from '../actions';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
        paddingTop: 20,
    },
    body: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        padding: 20,
    },
    more: {
        textAlign: 'center',
        marginTop: 45,
    },
});

class Puzzle extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.puzzle.category}</Text>
                <Text style={styles.body}>
                    {(this.props.puzzle.type === 'caesar') ? 
                        caesar(this.props.puzzle.solution) :
                        ((this.props.puzzle.type === 'vigenere') ?
                            vigenere(this.props.puzzle.solution, this.props.puzzle.key) :
                            atbash(this.props.puzzle.solution)
                    )}
                </Text>
                <FormInput 
                    placeholder={'Solution'} 
                />
                <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Submit' />
                <TouchableOpacity>
                    <Text style={styles.more}>
                        Learn more about {this.props.puzzle.type} ciphers...
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        puzzle: state.puzzleSelected,
    };
};

export default connect(mapStateToProps, actions)(Puzzle);
