import React, { Component } from 'react';
import { Text, View, ListView, ScrollView } from 'react-native';
import { List, ListItem, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import SinglePuzzle from './SinglePuzzle';
import * as actions from '../actions';
import styles from '../styles';

class Puzzles extends Component {
    // Initial state
    state = {
        selectedIndex: 0,
    };

    // Executes before component mounts.
    componentWillMount() {
        this.props.loadPuzzles();
    }

    // 
    updateIndex(selectedIndex) {
        this.setState({
            selectedIndex,
        })
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        switch (this.state.selectedIndex) {
            case 0:
                crypto = this.props.puzzles.filter((item) => {return item.type == 'cryptography'});
                this.dataSource = ds.cloneWithRows(crypto);
                break;
            case 1:
                cyber = this.props.puzzles.filter((item) => {return item.type == 'cybersecurity'});
                this.dataSource = ds.cloneWithRows(cyber);
                break;
            case 2:
                logic = this.props.puzzles.filter((item) => {return item.type == 'logic'});
                this.dataSource = ds.cloneWithRows(logic);
                break;
            default:
                this.dataSource = ds.cloneWithRows(this.props.puzzles);
                break;
        }
        const buttons = ['Cryptography', 'Cybersecurity', 'Logic'];

        return (this.props.detailView) ?
            <SinglePuzzle /> :
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <ButtonGroup
                        onPress={this.updateIndex.bind(this)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={buttons}
                        containerStyle={{backgroundColor: '#567FDE'}}
                        textStyle={{color: '#fff'}}
                    />
                    <List containerStyle={styles.list}>
                        <ListView 
                            enableEmptySections
                            dataSource={this.dataSource} 
                            renderRow={(rowData) =>
                                <ListItem 
                                    containerStyle={styles.listItem} 
                                    title={(rowData.type == 'cryptography') ? rowData.data.category : rowData.data.problem}
                                    subtitle={'Level: ' + rowData.data.rating + '     ' + (JSON.stringify(this.props.user.solved).contains(rowData.data.id) ? 'Solved' : '')}
                                    subtitleStyle={styles.subtitle}
                                    onPress={() => this.props.selectPuzzle(rowData)} 
                                />
                            } 
                        />
                    </List>
                </ScrollView>
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
        puzzles: state.puzzles,
        detailView: state.detailView,
        user: state.user,
    };
}

export default connect(mapStateToProps, actions)(Puzzles);