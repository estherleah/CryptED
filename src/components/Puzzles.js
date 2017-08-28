import React, { Component } from 'react';
import { Text, View, ListView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, ListItem, ButtonGroup, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import SinglePuzzle from './SinglePuzzle';
import * as actions from '../actions';
import styles from '../styles';

class Puzzles extends Component {
    // Initial state
    state = {
        selected: 'crypto',
    };

    // Executes before component mounts.
    componentWillMount() {
        this.props.loadPuzzles();
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        switch (this.state.selected) {
            case 'crypto':
                crypto = this.props.puzzles.filter((item) => {return item.type == 'cryptography'});
                this.dataSource = ds.cloneWithRows(crypto);
                break;
            case 'cyber':
                cyber = this.props.puzzles.filter((item) => {return item.type == 'cybersecurity'});
                this.dataSource = ds.cloneWithRows(cyber);
                break;
            case 'logic':
                logic = this.props.puzzles.filter((item) => {return item.type == 'logic'});
                this.dataSource = ds.cloneWithRows(logic);
                break;
            default:
                this.dataSource = ds.cloneWithRows(this.props.puzzles);
                break;
        }

        return (this.props.detailView) ?
            <SinglePuzzle /> :
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <View style={styles.tabs}>
                        <TouchableOpacity 
                            style={styles.tab} 
                            onPress={() => {this.setState({selected: 'crypto'})}} 
                        >
                            <Icon name='key-variant' type='material-community' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Cryptography</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.tab} 
                            onPress={() => {this.setState({selected: 'cyber'})}} 
                        >
                            <Icon name='security' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Cybersecurity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.tab} 
                            onPress={() => {this.setState({selected: 'logic'})}} 
                        >
                            <Icon name='puzzle-piece' type='font-awesome' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Logic</Text>
                        </TouchableOpacity>
                        {(this.props.user.admin) ?
                            <TouchableOpacity 
                                style={styles.tab} 
                                onPress={() => {this.setState({selected: 'admin'})}} 
                            >
                                <Icon name='lock' type='font-awesome' color='#fff' containerStyle={{height: 25}} />
                                <Text style={styles.tabText}>Admin</Text>
                            </TouchableOpacity> 
                            : null}
                    </View>
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
                {(this.props.user != null) ?
                    this.renderInitialView() :
                <ActivityIndicator size='large' />}
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