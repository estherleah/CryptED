import React, { Component } from 'react';
import { Text, View, ListView, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import Cryptography from './Cryptography';
import * as actions from '../actions';
import styles from '../styles';

class CryptographyPuzzles extends Component {
    // Executes before component mounts.
    componentWillMount() {
        this.props.loadCryptographyPuzzles();
        {(this.props.user == null) ? this.props.createNewUser() : null}
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
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <AppHeader />
                    <List containerStyle={styles.list}>
                        <ListView 
                            enableEmptySections
                            dataSource={this.dataSource} 
                            renderRow={(rowData) =>
                                <ListItem 
                                    containerStyle={styles.listItem} 
                                    title={rowData.category}
                                    subtitle={'Level: ' + rowData.rating + '     ' + (JSON.stringify(this.props.user.solved).contains(rowData.id) ? 'Solved' : '')}
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
        cryptoPuzzles: state.cryptoPuzzles,
        detailView: state.detailView,
        user: state.user,
    };
}

export default connect(mapStateToProps, actions)(CryptographyPuzzles);