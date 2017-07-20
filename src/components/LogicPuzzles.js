import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import _ from 'lodash';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import Puzzle from './Puzzle';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';
import * as actions from '../actions';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    list: {
        width: '100%',
        backgroundColor: '#F5FCFF',
    },
    subtitle: {
        fontWeight: 'normal',
    },
});

class PuzzleList extends Component {
    // Executes before component mounts.
    componentWillMount() {
        this.props.loadInitialPuzzles();
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.puzzles);

        return (this.props.detailView) ?
            <Puzzle />:
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListView 
                        dataSource={this.dataSource} 
                        renderRow={(rowData) =>
                            <ListItem 
                                title={rowData.category}
                                subtitleStyle={styles.subtitle}
                                onPress={() => this.props.selectPuzzle(rowData)}
                            />
                        } 
                    />
                </List>
            </View>
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.renderInitialView()}
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    // so get an array instead of an object of objects
    const puzzles = _.map(state.puzzles, (val) => {
        return { ...val };
    });
    return {
        puzzles,
        detailView: state.detailView,
    };
}

export default connect(mapStateToProps, actions)(PuzzleList);