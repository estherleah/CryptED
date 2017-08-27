import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { FormInput, Button, Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';
import * as actions from '../actions';
import styles from '../styles';

class Cryptography extends Component {
    // Initial state
    state = {
        ciphertext: '',
        solution: '',
        modalVisible: false,
    };

    // Executes before component mounts.
    // Sets ciphertext so it does not change as the state changes.
    componentWillMount() {
        switch (this.props.puzzle.type) {
            case 'caesar':
                cipher = caesar(this.props.puzzle.plaintext);
                break;
            case 'vigenere':
                cipher = vigenere(this.props.puzzle.plaintext, this.props.puzzle.key);
                break;
            case 'atbash':
                cipher = atbash(this.props.puzzle.plaintext);
                break;    
            default:
                cipher = this.props.puzzle.ciphertext;
        }
        this.setState({
            ciphertext: cipher,
        });
        this.props.loadTopScores();
    }

    // Toggles the modal with additional info.
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        });
    }

    // What happens when submit a solution.
    onSubmit() {
        const { solution } = this.state;
        const { puzzle } = this.props;
        // check to see if correct solution
        if (this.state.solution.toLowerCase() === this.props.puzzle.plaintext.toLowerCase()) {
            // check if already solved the puzzle
            if (!JSON.stringify(this.props.user.solved).contains(this.props.puzzle.id)) {
                let newScore = this.props.user.score + this.props.puzzle.rating;
                this.props.puzzleSolved(this.props.puzzle.id);
                this.props.updateScore(newScore);

                // check if need to update leaderboard
                let leaderboard = this.props.topScores;
                // check if leaderboard has less than 10 users
                if (leaderboard.length < 10) {
                    // add to leaderboard
                    leaderboard.push({deletionKey: this.props.user.uid, name: this.props.user.name, score: newScore});
                    // sort the leaderboard
                    leaderboard.sort((a, b) => {
                        return b.score - a.score;
                    });
                    // add to database and store
                    this.props.addUserToLeaderboard(null, this.props.user.name, newScore, leaderboard);
                }
                else {
                    // check if score qualifies a place on the leaderboard
                    lowest = leaderboard[9];
                    if (newScore > lowest.score) {
                        // check if already on the leaderboard
                        if (JSON.stringify(this.props.topScores).contains(this.props.user.name)) {
                            // change the score in the leaderboard
                            leaderboard.forEach((person) => {
                                if (person.name == this.props.user.name) {
                                    person.score == newScore;
                                }
                            }, this);
                            // sort the leaderboard
                            leaderboard.sort((a, b) => {
                                return b.score - a.score;
                            });
                            // add to database and store
                            this.props.updateUserOnLeaderboard(newScore, leaderboard);
                        }
                        else {
                            // change the lowest person on leaderboard to current user
                            leaderboard.pop();
                            leaderboard.push({deletionKey: this.props.user.uid, name: this.props.user.name, score: newScore});
                            // sort the leaderboard
                            leaderboard.sort((a, b) => {
                                return b.score - a.score;
                            });
                            // add to database and store
                            this.props.addUserToLeaderboard(lowest.deletionKey, this.props.user.name, newScore, leaderboard);
                        }
                    }
                }
            }
            Alert.alert("Correct", this.state.solution + " is the correct answer");
            this.props.noneSelected();
        } else {
            Alert.alert("Inorrect", "Please try again");
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View style={styles.header}>
                        <Header 
                            backgroundColor='#567FDE'
                            leftComponent={<Icon 
                                name='arrow-back' 
                                color='#fff' 
                                onPress={() => this.props.noneSelected()} 
                            />} 
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>{this.props.puzzle.category}</Text>
                    <Text style={styles.body}>
                        {this.state.ciphertext}
                    </Text>
                    <FormInput 
                        onChangeText={solution => this.setState({solution})}
                        textInputRef={this.state.solution}  
                        placeholder={'Solution'} 
                    />
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Submit' onPress={this.onSubmit.bind(this)} />
                    <TouchableOpacity
                        onPress={() => {this.setModalVisible(true)}}
                    >
                        <Text style={styles.more}>
                            Learn more about {this.props.puzzle.type} ciphers...
                        </Text>
                    </TouchableOpacity>

                    {/* Modal for more info on cipher */}
                    <Modal
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Header 
                                    backgroundColor='#567FDE'
                                    leftComponent={<Icon 
                                        name='arrow-back' 
                                        color='#fff' 
                                        onPress={() => {this.setModalVisible(!this.state.modalVisible)}} 
                                    />} 
                                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                                <Text style={styles.title}>{this.props.puzzle.category}</Text>
                                <Text>{this.props.puzzle.notes}</Text>
                            </ScrollView>
                        </View>
                    </Modal>
                    {/* End of modal */}
                    
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        puzzle: state.puzzleSelected,
        user: state.user,
        topScores: state.topScores,
    };
};

export default connect(mapStateToProps, actions)(Cryptography);