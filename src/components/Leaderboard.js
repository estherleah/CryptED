import React, { Component } from 'react';
import { Text, View, ScrollView, ListView } from 'react-native';
import { ListItem } from 'react-native-elements';
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
        this.dataSource = ds.cloneWithRows(this.props.scores.slice(0, 10));
        return this.dataSource;
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <Text style={styles.title}>Top 10 scores</Text>                  
                    <ListView 
                        enableEmptySections
                        dataSource={this.getData()} 
                        renderRow={(rowData, sectionID, rowID) =>
                            <ListItem 
                                containerStyle={styles.listItem} 
                                rightIcon={<Text style={styles.scores}>{rowData.score}</Text>}
                                title={rowData.name} 
                                leftIcon={<Text style={styles.numbering}>{Number(rowID) + 1}.</Text>}
                            />
                        } 
                    />
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        scores: state.scores,
        user: state.user,
    };
}

export default connect(mapStateToProps, actions)(Leaderboard);