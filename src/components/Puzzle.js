import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    problem: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const Puzzle = (props) => {
    return(
        <View style={styles.card}>
            <Text style={styles.title}>
                {props.puzzles.category}
            </Text>
            <Text style={styles.problem}>
                {props.puzzles.problem}
            </Text>
        </View>
    );
};

export default connect(null, actions)(Puzzle);
