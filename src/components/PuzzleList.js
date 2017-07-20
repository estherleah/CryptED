import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import Cryptography from './Cryptography';
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
        this.props.loadCryptographyPuzzles();
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.cryptoPuzzles);
        
        return (this.props.detailView) ?
            <Cryptography />:
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListView 
                        enableEmptySections
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
    return {
        cryptoPuzzles: state.cryptoPuzzles,
        detailView: state.detailView,
    };
}

export default connect(mapStateToProps, actions)(PuzzleList);