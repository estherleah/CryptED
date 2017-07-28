import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import Logic from './Logic';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';
import * as actions from '../actions';
import styles from '../styles';

class LogicPuzzles extends Component {
    // Executes before component mounts.
    componentWillMount() {
        this.props.loadLogicPuzzles();
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.logicPuzzles);

        return (this.props.detailView) ?
            <Logic />:
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSource} 
                        renderRow={(rowData) =>
                            <ListItem 
                                title={rowData.problem}
                                subtitle={(JSON.stringify(rowData).contains(this.props.uid) ? 'Solved' : '')}
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
        logicPuzzles: state.logicPuzzles,
        detailView: state.detailView,
        uid: state.uid,
    };
}

export default connect(mapStateToProps, actions)(LogicPuzzles);