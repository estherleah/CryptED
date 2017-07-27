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
        {(this.props.puzzle.type === 'caesar') ? 
            cipher = caesar(this.props.puzzle.plaintext) :
            ((this.props.puzzle.type === 'vigenere') ?
                cipher = vigenere(this.props.puzzle.plaintext, this.props.puzzle.key) :
                cipher = atbash(this.props.puzzle.plaintext)
        )}
        this.setState({
            ciphertext: cipher,
        })
    }

    // Toggles the modal with additional info.
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        });
    }

    onSubmit() {
        const { solution } = this.state;
        (this.state.solution.toLowerCase() === this.props.puzzle.plaintext.toLowerCase()) ?
            Alert.alert("Correct", this.state.solution + " is the correct solution") :
            Alert.alert("Incorrect", "Please try again");
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                            <ScrollView style={styles.content}>
                                <Text style={styles.title}>{this.props.puzzle.category}</Text>
                                <Text>{this.props.puzzle.notes}</Text>
                            </ScrollView>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        onPress={() => {this.setModalVisible(true)}}
                    >
                        <Text style={styles.more}>
                            Learn more about {this.props.puzzle.type} ciphers...
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        puzzle: state.puzzleSelected,
    };
};

export default connect(mapStateToProps, actions)(Cryptography);