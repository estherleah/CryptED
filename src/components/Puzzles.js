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
        // check if data and load if there is none
        // really just an extra check
        if (this.props.cryptoPuzzles == []) {
            this.props.loadCryptographyPuzzles();
        }
        if (this.props.cyberPuzzles == []) {
            this.props.loadCyberSecurityPuzzles();
        }
        if (this.props.loadLogicPuzzles == []) {
            this.props.loadLogicPuzzles();
        }
        // only check and load if the user is an admin (data is already loaded when loggedIn)
        if (this.props.newPuzzles == [] && this.props.user.admin) {
            this.props.loadNewPuzzles();
        }
    }

    // Decides to render a puzzle or the puzzle list, depending on if a puzzle has been selected.
    renderInitialView() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        switch (this.state.selected) {
            case 'crypto':
                this.dataSource = ds.cloneWithRows(this.props.cryptoPuzzles);
                break;
            case 'cyber':
                this.dataSource = ds.cloneWithRows(this.props.cyberPuzzles);
                break;
            case 'logic':
                this.dataSource = ds.cloneWithRows(this.props.logicPuzzles);
                break;
            case 'admin':
                this.dataSource = ds.cloneWithRows(this.props.newPuzzles);
                break;
            default:
                break;
        }

        return (this.props.detailView) ?
            <SinglePuzzle /> :
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <View style={styles.tabs}>
                        <TouchableOpacity 
                            style={[styles.tab, {backgroundColor: this.state.selected == 'crypto' ? '#6392FF' : null}]} 
                            onPress={() => {this.setState({selected: 'crypto'})}} 
                        >
                            <Icon name='key-variant' type='material-community' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Cryptography</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, {backgroundColor: this.state.selected == 'cyber' ? '#6392FF' : null}]} 
                            onPress={() => {this.setState({selected: 'cyber'})}} 
                        >
                            <Icon name='security' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Cybersecurity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, {backgroundColor: this.state.selected == 'logic' ? '#6392FF' : null}]} 
                            onPress={() => {this.setState({selected: 'logic'})}} 
                        >
                            <Icon name='puzzle-piece' type='font-awesome' color='#fff' containerStyle={{height: 25}} />
                            <Text style={styles.tabText}>Logic</Text>
                        </TouchableOpacity>
                        {(this.props.user.admin) ?
                            <TouchableOpacity 
                                style={[styles.tab, {backgroundColor: this.state.selected == 'admin' ? '#6392FF' : null}]} 
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
                                    title={rowData.title}
                                    subtitle={'Level: ' + rowData.rating + '     ' + (JSON.stringify(this.props.user.solved).includes(rowData.id) ? 'Solved' : '')}
                                    subtitleStyle={styles.subtitle}
                                    onPress={() => this.props.selectPuzzle(rowData, this.state.selected)} 
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
        detailView: state.detailView,
        user: state.user,
        cryptoPuzzles: state.cryptoPuzzles,
        cyberPuzzles: state.cyberPuzzles,
        logicPuzzles: state.logicPuzzles,
        newPuzzles: state.newPuzzles,
    };
}

export default connect(mapStateToProps, actions)(Puzzles);