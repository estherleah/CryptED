import React, { Component } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { FormInput, Button, Header, Icon } from 'react-native-elements';
import { Select, Option } from "react-native-chooser";
import { connect } from 'react-redux';
import * as actions from '../actions';
import styles from '../styles';

class CyberSecurity extends Component {
    // Initial state
    state = {
        solution: '',
    };

    // What happens when submit a solution.
    onSubmit() {
        const { solution } = this.state;
        const { puzzle } = this.props;
        // check to see if correct solution
        // TODO: need to check this in a better way e.g. if wording is slightly different...
        if (this.state.solution.toLowerCase() === this.props.puzzle.solution.toLowerCase()) {
            // check if already solved the puzzle
            if (!JSON.stringify(this.props.user.solved).contains(this.props.puzzle.id)) {
                this.props.puzzleSolved(this.props.puzzle.id);
                this.props.updateScore(this.props.puzzle.rating + this.props.user.score);
            }
            Alert.alert("Correct", this.state.solution + " is the correct answer");
            this.props.noneSelected();
        } else {
            Alert.alert("Incorrect", "Please try again");
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
                    <Text style={styles.title}>Cyber Security Puzzle</Text>
                    <Text style={styles.body}>
                        {this.props.puzzle.problem}
                    </Text>
                    {(this.props.puzzle.type == 'text') ? 
                        <View>
                            <FormInput 
                                onChangeText={solution => this.setState({solution})}
                                textInputRef={this.state.solution}  
                                placeholder={'Solution'} 
                            />
                        </View> : 
                        <View>
                            <View style={styles.content}>
                                <Text>A:  {this.props.puzzle.options.A}</Text>
                                <Text>B:  {this.props.puzzle.options.B}</Text>
                                <Text>C:  {this.props.puzzle.options.C}</Text>
                                <Text>D:  {this.props.puzzle.options.D}</Text>
                            </View>
                            <Select
                                transparent 
                                onSelect = {value => this.setState({solution: value})} 
                                selectedValue={this.state.solution} 
                                selected = {this.state.solution} 
                                defaultText  = 'Solution' 
                                style = {styles.select} 
                                backdropStyle  = {styles.selectBackdrop} 
                                optionListStyle = {styles.selectOptions} 
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
                    <Button raised backgroundColor='#567FDE' containerViewStyle={styles.button} title='Submit' onPress={this.onSubmit.bind(this)} />
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
    };
};

export default connect(mapStateToProps, actions)(CyberSecurity);