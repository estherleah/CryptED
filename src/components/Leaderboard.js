import React, { Component } from 'react';
import { Text, View, ScrollView, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import * as actions from '../actions';
import styles from '../styles';
import firebase from 'firebase';

class Leaderboard extends Component {
    // Executes before component mounts.
    componentWillMount() {
        this.props.loadScores();
    }

    // Get the data for the top 10 scores.
    getData() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1!== r2,
        });
        this.dataSource = ds.cloneWithRows(this.props.scores);
        return this.dataSource;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                        <List containerStyle={styles.list}>
                            <ListView 
                                enableEmptySections
                                dataSource={this.getData()} 
                                renderRow={(rowData) =>
                                    <ListItem 
                                        hideChevron={true} 
                                        title={rowData.name} 
                                        badge={{ value: rowData.score, containerStyle: styles.badge }}
                                    />
                                } 
                            />
                        </List>
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        scores: state.scores,
    };
}

export default connect(mapStateToProps, actions)(Leaderboard);