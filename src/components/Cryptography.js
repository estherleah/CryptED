import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { FormInput, Button, Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { caesar, vigenere, atbash } from '../functions/ciphers.js';
import * as actions from '../actions';
import styles from '../styles';

class Cryptography extends Component {
    // Initial state
    state = { modalVisible: false };

    // 
    setModalVisible(visible) {
        this.setState({
            modalVisible: visible,
        });
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
                        {(this.props.puzzle.type === 'caesar') ? 
                            caesar(this.props.puzzle.plaintext) :
                            ((this.props.puzzle.type === 'vigenere') ?
                                vigenere(this.props.puzzle.plaintext, this.props.puzzle.key) :
                                atbash(this.props.puzzle.plaintext)
                        )}
                    </Text>
                    <FormInput 
                        placeholder={'Solution'} 
                    />
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Submit' />
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