import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Modal, Alert, KeyboardAvoidingView, BackHandler } from 'react-native';
import { FormInput, Button, Header, Icon } from 'react-native-elements';
import { Select, Option } from 'react-native-chooser';
import MultilineTextInput from './MultilineTextInput';
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import { caesar, vigenere, atbash, keyword } from '../functions/ciphers.js';
import * as actions from '../actions';
import styles from '../styles';

class SinglePuzzle extends Component {
    // Initial state
    state = {
        ciphertext: '',
        solution: '',
        modalVisible: false,
        editing: false,
        moreVisible: false,
    };

    // Executes before component mounts.
    // Sets ciphertext so it does not change as the state changes.
    componentWillMount() {
        if (this.props.type = 'crypto') {
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
                case 'keyword':
                    cipher = keyword(this.props.puzzle.plaintext, this.props.puzzle.key);
                    break; 
                default:
                    cipher = this.props.puzzle.ciphertext;
            }
            this.setState({
                ciphertext: cipher,
            });
        }
        // load top scores so have the most up-to-date information
        this.props.loadTopScores();
        // handle android back button presses
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.noneSelected();
            return true;
        });
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
        isCorrect = false;
        // check to see if correct solution
        if (this.props.type == 'crypto') {
            isCorrect = (this.state.solution.trim().toLowerCase() === this.props.puzzle.plaintext.trim().toLowerCase());
        } else {
            isCorrect = (this.state.solution.trim().toLowerCase() === this.props.puzzle.solution.trim().toLowerCase());
        }
        if (isCorrect) {
            // check if already solved the puzzle
            if (!JSON.stringify(this.props.user.solved).includes(this.props.puzzle.id)) {
                let newScore = this.props.user.score + this.props.puzzle.rating;
                this.props.puzzleSolved(this.props.puzzle.id);
                this.props.updateScore(newScore);

                // check if need to update leaderboard
                let leaderboard = this.props.topScores;
                // check if leaderboard has less than 10 users
                if (leaderboard.length < 10) {
                    // add to database and store
                    // NB: if the user is already on the leaderboard, this will just overwrite any data at that location
                    this.props.addUserToLeaderboard(null, this.props.user.name, newScore);
                }
                else {
                    // check if score qualifies a place on the leaderboard
                    lowest = leaderboard[leaderboard.length - 1];
                    if (newScore > lowest.score) {
                        // check if already on the leaderboard
                        if (JSON.stringify(this.props.topScores).includes(this.props.user.uid)) {
                            // add to database and store
                            this.props.updateUserOnLeaderboard(newScore);
                        }
                        else {
                            // add to database and store
                            this.props.addUserToLeaderboard(lowest.deletionKey, this.props.user.name, newScore);
                        }
                    }
                }
            }
            Alert.alert("Correct", "Well done!");
            this.props.noneSelected();
        } else {
            Alert.alert("Inorrect", "Please try again");
        }
    }


    //
    // ADMIN FUNCTIONS -----------------------------------------------------------------
    //

    // Admin approves a puzzle.
    onApprove() {
        const { puzzle, newPuzzles } = this.props;
        // find index of puzzle in newPuzzles so can remove it
        toApprove = newPuzzles.indexOf(puzzle);
        this.props.addPuzzle(puzzle.id, puzzle, puzzle.category, toApprove);
    }

    // Admin changes a puzzle.
    onChange() {
        const { puzzle } = this.props;
        this.setState({editing: true});
        this.props.formUpdate({ prop: 'title', value: this.props.puzzle.title });
        this.props.formUpdate({ prop: 'problem', value: this.props.puzzle.problem });
        this.props.formUpdate({ prop: 'solution', value: this.props.puzzle.solution });
        this.props.formUpdate({ prop: 'notes', value: this.props.puzzle.notes });
        this.props.formUpdate({ prop: 'rating', value: this.props.puzzle.rating });
        if (this.props.puzzle.type == 'multi') {
            this.props.optionsUpdate({ position: 'A', value: this.props.puzzle.options.A });
            this.props.optionsUpdate({ position: 'B', value: this.props.puzzle.options.B });
            this.props.optionsUpdate({ position: 'C', value: this.props.puzzle.options.C });
            this.props.optionsUpdate({ position: 'D', value: this.props.puzzle.options.D });
        }
    }

    // Admin cancels amending a puzzles
    onCancelEditing() {
        this.props.cancelEditing();
    }

    // Admin finishes amending a puzzle.
    onFinishEditing() {
        const { puzzle, title, problem, solution, notes, rating, options, newPuzzles } = this.props;
        toAmend = newPuzzles.indexOf(puzzle);
        amendedPuzzle = { ...puzzle, title, problem, solution, notes, rating, options };
        // text only puzzle
        if (puzzle.type == 'text') {
            this.props.amendPuzzle(puzzle.id, title, problem, solution, notes, rating, [], toAmend, amendedPuzzle);
        }
        // multiple choice puzzle
        else {
            this.props.amendPuzzle(puzzle.id, title, problem, solution, notes, rating, options, toAmend, amendedPuzzle);
        }
    }

    // Admin removes a puzzle.
    onDelete() {
        const { puzzle, newPuzzles } = this.props;
        // find index of puzzle in array
        toDelete = newPuzzles.indexOf(puzzle);
        this.props.deletePuzzle(puzzle.id, toDelete);
    }

    //
    // END OF ADMIN FUNCTIONS ----------------------------------------------------------
    //


    render() {
        return(
            (this.props.type == 'crypto') ?
            // Cryptography puzzle
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.scroll}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View style={styles.header}>
                        <Header 
                            backgroundColor='#673ab7'
                            leftComponent={
                                <TouchableOpacity
                                    style={{width: 40, height: 30}}
                                    onPress={() => this.props.noneSelected()} 
                                >
                                    <Icon 
                                        name='arrow-back' 
                                        color='#fff' 
                                    />
                                </TouchableOpacity>} 
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>{this.props.puzzle.title}</Text>
                    <Text style={styles.body}>
                        {this.state.ciphertext}
                    </Text>
                    <FormInput 
                        onChangeText={solution => this.setState({solution})}
                        textInputRef={this.state.solution}  
                        placeholder={'Solution'} 
                    />
                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='SUBMIT' onPress={this.onSubmit.bind(this)} />
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
                                    backgroundColor='#673ab7'
                                    leftComponent={
                                        <TouchableOpacity
                                            style={{width: 40, height: 30}}
                                            onPress={() => {this.setModalVisible(!this.state.modalVisible)}} 
                                        >
                                            <Icon 
                                                name='arrow-back' 
                                                color='#fff' 
                                            />
                                        </TouchableOpacity>} 
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
                </KeyboardAvoidingView>
            </View> 
            // end of Cryptography puzzle
            :
            (this.props.type == 'admin') ?
            // Newly added puzzle
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.scroll}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View style={styles.header}>
                        <Header 
                            backgroundColor='#673ab7'
                            leftComponent={
                                <TouchableOpacity
                                    style={{width: 40, height: 30}}
                                    onPress={() => this.props.noneSelected()} 
                                >
                                    <Icon 
                                        name='arrow-back' 
                                        color='#fff' 
                                    />
                                </TouchableOpacity>} 
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>
                    <Text style={styles.title}>{this.props.puzzle.title}</Text>
                    <Text style={styles.subheading}>Problem:</Text>
                    <Text style={styles.body}>
                        {this.props.puzzle.problem}
                        {'\n'}{'\n'}
                    </Text>
                    {(this.props.puzzle.type == 'multi') ?
                    <View>
                        <Text style={styles.subheading}>Options:</Text>
                        <Text style={styles.body}>
                            A:   {this.props.puzzle.options.A}
                            {'\n'}
                            B:   {this.props.puzzle.options.B}
                            {'\n'}
                            C:   {this.props.puzzle.options.C}
                            {'\n'}
                            D:   {this.props.puzzle.options.D}
                            {'\n'}{'\n'}
                        </Text>
                    </View>
                    : null}
                    <Text style={styles.subheading}>Solution:</Text>
                    <Text style={styles.body}>
                        {this.props.puzzle.solution}
                        {'\n'}{'\n'}
                    </Text>
                    {(this.props.puzzle.notes != '') ?
                    <View>
                        <Text style={styles.subheading}>Notes:</Text>
                        <Text style={styles.body}>
                            {this.props.puzzle.notes}
                            {'\n'}{'\n'}
                        </Text>
                    </View>
                    : null}
                    <Text style={styles.subheading}>Level:</Text>
                    <Text style={styles.body}>
                        {this.props.puzzle.rating}
                    </Text>
                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={[styles.button, {marginBottom: 0}]} title='APPROVE' onPress={this.onApprove.bind(this)} />
                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={[styles.button, {marginBottom: 0}]} title='CHANGE' onPress={this.onChange.bind(this)} />
                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='DELETE' onPress={this.onDelete.bind(this)} />

                    {/* Modal for editing a puzzle */}
                    <Modal
                        visible={this.state.editing}
                        onRequestClose={() => this.setState({editing: false})}
                    >
                        <View style={styles.container}>
                            <KeyboardAvoidingView style={styles.scroll}>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                                <View style={styles.header}>
                                    <Header 
                                        backgroundColor='#673ab7'
                                        leftComponent={
                                            <TouchableOpacity
                                                style={{width: 40, height: 30}}
                                                onPress={() => this.setState({editing: false})} 
                                            >
                                                <Icon 
                                                    name='arrow-back' 
                                                    color='#fff' 
                                                />
                                            </TouchableOpacity>} 
                                        centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                    />
                                </View>
                                    <Text style={styles.title}>Amending {(this.props.puzzle.category == 'logic') ? 'Logic' : 'Cyber Security'} Puzzle</Text>
                                    <Text style={styles.subheading}>Title:</Text>
                                    <FormInput 
                                        autoCapitalize={'words'}
                                        placeholder={this.props.title} 
                                        value={this.props.title} 
                                        onChangeText={value => this.props.formUpdate({ prop: 'title', value })} 
                                    />
                                    <Text style={styles.subheading}>Problem:</Text>
                                    <MultilineTextInput 
                                        autoCapitalize={'sentences'} 
                                        numberOfLines={5} 
                                        placeholder={this.props.problem} 
                                        value={this.props.problem} 
                                        onChangeText={value => this.props.formUpdate({ prop: 'problem', value })} 
                                    />
                                    {
                                        (this.props.puzzle.type == 'text') ?
                                            <View>
                                                <Text style={styles.subheading}>Solution:</Text>
                                                <FormInput 
                                                    autoCapitalize={'sentences'} 
                                                    placeholder={this.props.solution} 
                                                    value={this.props.solution} 
                                                    onChangeText={value => this.props.formUpdate({ prop: 'solution', value })} 
                                                />
                                            </View> :
                                            <View>
                                                <Text style={styles.subheading}>Options:</Text>
                                                <MultilineTextInput 
                                                    autoCapitalize={'sentences'} 
                                                    placeholder={this.props.options.A} 
                                                    value={this.props.options.A} 
                                                    onChangeText={value => this.props.optionsUpdate({ position: 'A', value })} 
                                                />
                                                <MultilineTextInput 
                                                    autoCapitalize={'sentences'} 
                                                    placeholder={this.props.options.B} 
                                                    value={this.props.options.B} 
                                                    onChangeText={value => this.props.optionsUpdate({ position: 'B', value })} 
                                                />
                                                <MultilineTextInput 
                                                    autoCapitalize={'sentences'} 
                                                    placeholder={this.props.options.C} 
                                                    value={this.props.options.C} 
                                                    onChangeText={value => this.props.optionsUpdate({ position: 'C', value })} 
                                                />
                                                <MultilineTextInput 
                                                    autoCapitalize={'sentences'} 
                                                    placeholder={this.props.options.D} 
                                                    value={this.props.options.D} 
                                                    onChangeText={value => this.props.optionsUpdate({ position: 'D', value })} 
                                                />
                                                <Text style={styles.subheading}>Solution:</Text>
                                                <Select
                                                    transparent 
                                                    onSelect = {value => this.props.formUpdate({ prop: 'solution', value })} 
                                                    selectedValue = {this.props.solution} 
                                                    selected = {this.props.solution} 
                                                    defaultText  = 'Please select the correct solution' 
                                                    style = {styles.select} 
                                                    backdropStyle  = {styles.selectBackdrop} 
                                                    optionListStyle = {[styles.selectOptions, {height: 160}]} 
                                                    textStyle = {{marginLeft: -10}} 
                                                    indicator = 'down' 
                                                    indicatorColor = 'gray'
                                                >
                                                    <Option value = 'A'>Option A</Option>
                                                    <Option value = 'B'>Option B</Option>
                                                    <Option value = 'C'>Option C</Option>
                                                    <Option value = 'D'>Option D</Option>
                                                </Select>
                                            </View>
                                    }
                                    <Text style={styles.subheading}>Notes:</Text>
                                    <MultilineTextInput 
                                        autoCapitalize={'sentences'} 
                                        numberOfLines={5} 
                                        placeholder={this.props.notes} 
                                        value={this.props.notes} 
                                        onChangeText={value => this.props.formUpdate({ prop: 'notes', value })} 
                                    />
                                    <Text style={styles.subheading}>Level:</Text>
                                    <Select 
                                        transparent 
                                        onSelect = {value => this.props.formUpdate({ prop: 'rating', value })} 
                                        selectedValue = {this.props.rating} 
                                        selected = {this.props.rating}
                                        defaultText  = 'Level' 
                                        style = {styles.select} 
                                        backdropStyle  = {styles.selectBackdrop} 
                                        optionListStyle = {[styles.selectOptions, {height: 200}]} 
                                        textStyle = {{marginLeft: -10}} 
                                        indicator = 'down' 
                                        indicatorColor = 'gray'
                                    >
                                        <Option value = {1}>Very easy</Option>
                                        <Option value = {2}>Easy</Option>
                                        <Option value = {3}>Medium</Option>
                                        <Option value = {4}>Hard</Option>
                                        <Option value = {5}>Very hard</Option>
                                    </Select>
                                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={[styles.button, {marginBottom: 0}]} title='AMEND' onPress={this.onFinishEditing.bind(this)} />
                                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='BACK' onPress={this.onCancelEditing.bind(this)} />
                                </ScrollView>
                                </KeyboardAvoidingView>
                        </View>
                    </Modal>
                    {/* End of modal */}

                </ScrollView>
                </KeyboardAvoidingView>
            </View>
            // end of newly added puzzle
            :
            // Cybersecurity and logic puzzle
            <View style={styles.container}>
                <KeyboardAvoidingView style={styles.scroll}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View style={styles.header}>
                        <Header 
                            backgroundColor='#673ab7'
                            leftComponent={
                                <TouchableOpacity
                                    style={{width: 40, height: 30}}
                                    onPress={() => this.props.noneSelected()} 
                                >
                                    <Icon 
                                        name='arrow-back' 
                                        color='#fff' 
                                    />
                                </TouchableOpacity>} 
                            centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                        />
                    </View>

                    {/* Modal for notes. This needs to be before the split for text and multi */}
                    <Modal
                        visible={this.state.moreVisible}
                        onRequestClose={() => this.setState({moreVisible: false})}
                    >
                        <View style={styles.container}>
                            <View style={styles.header}>
                                <Header 
                                    backgroundColor='#673ab7'
                                    leftComponent={
                                        <TouchableOpacity
                                            style={{width: 40, height: 30}}
                                            onPress={() => this.setState({moreVisible: false})} 
                                        >
                                            <Icon 
                                                name='arrow-back' 
                                                color='#fff' 
                                            />
                                        </TouchableOpacity>} 
                                    centerComponent={{ text: 'CryptED', style: { color: '#fff', fontSize: 22 } }} 
                                />
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
                                <Text style={styles.title}>{this.props.puzzle.title}</Text>
                                <Text>{this.props.puzzle.notes}</Text>
                            </ScrollView>
                        </View>
                    </Modal>
                    {/* End of modal */}

                    <Text style={styles.title}>{this.props.puzzle.title}</Text>
                    <Text style={styles.content}>{this.props.puzzle.problem}</Text>                    
                    {(this.props.puzzle.type == 'text') ? 
                        // Text only solution
                        <View>
                            <FormInput 
                                autoCapitalize={'sentences'}
                                onChangeText={solution => this.setState({solution})}
                                textInputRef={this.state.solution}  
                                placeholder={'Solution'} 
                            />
                        </View> : 
                        // Multiple choice solution
                        <View>
                            <RadioForm 
                                radio_props = {[
                                    {label: this.props.puzzle.options.A, value: 'A'},
                                    {label: this.props.puzzle.options.B, value: 'B'},
                                    {label: this.props.puzzle.options.C, value: 'C'},
                                    {label: this.props.puzzle.options.D, value: 'D'},
                                ]}
                                initial = {
                                    (this.state.solution == 'A') ? 0 : 
                                        (this.state.solution == 'B') ? 1 :
                                            (this.state.solution == 'C') ? 2 : 
                                                (this.state.solution == 'D') ? 3 : -1
                                }
                                onPress = {value => this.setState({solution: value})} 
                                buttonColor = '#ff6d00' 
                                buttonSize = {10} 
                                style = {[styles.radio, {marginLeft: 5, marginRight: 25}]} 
                                labelStyle = {{paddingBottom: 5}}
                            />
                        </View>
                    }
                    {(this.props.puzzle.notes != '') ?
                    <TouchableOpacity
                        onPress={() => this.setState({moreVisible: true})}
                    >
                        <Text style={styles.notes}>
                            Learn more...
                        </Text>
                    </TouchableOpacity>
                    : null }
                    <Button raised backgroundColor='#ff6d00' textStyle={{color: 'black'}} containerViewStyle={styles.button} title='SUBMIT' onPress={this.onSubmit.bind(this)} />
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
            // end of Cybersecurity and Logic puzzle
        );
    }
}

// Passing the state components to the props.
const mapStateToProps = (state) => {
    return {
        type: state.type,
        puzzle: state.puzzleSelected,
        user: state.user,
        topScores: state.topScores,
        title: state.title,
        problem: state.problem,
        solution: state.solution,
        notes: state.notes,
        rating: state.rating,
        options: state.options,
        newPuzzles: state.newPuzzles,
    };
};

export default connect(mapStateToProps, actions)(SinglePuzzle);