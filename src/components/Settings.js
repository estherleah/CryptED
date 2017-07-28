import React, { Component } from 'react';
import { Text, View, ListView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import * as actions from '../actions';
import styles from '../styles';

class Settings extends Component {
    // Executes before component mounts.
    componentWillMount() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    "name": "Score",
                    "value": this.props.user.score,
                    "icon": "trophy",
                    "iconType": "evilicon",
                },
                {
                    "name": "Admin",
                    "value": JSON.stringify(this.props.user.admin),
                    "icon": "user",
                    "iconType": "evilicon",
                },
            ]),
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader />
                <List containerStyle={styles.list}>
                    <ListView 
                        enableEmptySections
                        dataSource={this.state.dataSource} 
                        renderRow={(rowData) =>
                            <ListItem 
                                hideChevron={true} 
                                title={rowData.name}
                                leftIcon={{name: rowData.icon, type: rowData.iconType}}
                            />
                        } 
                    />
                </List>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps, actions)(Settings);