import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Title, Subtitle, Content, Button, Left, Right, Body, Icon, Item, Input } from 'native-base';
import Navigation from './Navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
    },
    puzzle: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        color: 'white',
    },
    more: {
        textAlign: 'center',
        marginTop: 45,
    },
});

export default class PuzzleList extends Component {
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>CryptED</Title>
                        <Subtitle>Cryptography</Subtitle>
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <Content>
                        <Text style={styles.title}>Caesar ciphers</Text>
                        <Text style={styles.puzzle}>
                            QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD
                        </Text>
                        <Item>
                            <Input placeholder="Solution" />
                        </Item>
                        <Button full>
                            <Text style={styles.button}>Submit</Text>
                        </Button>
                        <TouchableOpacity>
                            <Text style={styles.more}>
                                Learn more about Caesar ciphers...
                            </Text>
                        </TouchableOpacity>
                    </Content>
                </View>
            </Container>
        );
    }
}