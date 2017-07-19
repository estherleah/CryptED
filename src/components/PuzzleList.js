import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import Puzzle from './Puzzle';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';

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
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.puzzles)
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListView 
                        dataSource={this.dataSource} 
                        renderRow={(rowData) =>
                            <ListItem 
                                title={rowData.category}
                                subtitle={
                                    (rowData.type === 'caesar') ? 
                                        caesar(rowData.solution) :
                                        ((rowData.type === 'vigenere') ?
                                            vigenere(rowData.solution, rowData.key) :
                                            atbash(rowData.solution)
                                        )
                                }
                                subtitleStyle={styles.subtitle}
                            />
                        } 
                    />
                </List>
            </View>
        );
    }
}

// Passing the state.puzzles to the prop puzzles.
const mapStateToProps = (state) => {
    return { puzzles: state.puzzles };
}

export default connect(mapStateToProps)(PuzzleList);