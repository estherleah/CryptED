import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    //
    // GENERAL STYLES
    //
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        height: 70,
        width: '100%',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        paddingBottom: 20,
    },
    body: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        margin: 20,
    },
    list: {
        width: '100%',
        backgroundColor: '#F5FCFF',
        marginTop: 0,
    },
    subtitle: {
        fontWeight: 'normal',
    },

    //
    // PAGE SPECIFIC STYLES
    //

    // Login page
    error: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    
    // Cryptography page
    more: {
        textAlign: 'center',
        marginTop: 45,
    },
    content: {
        paddingLeft: 20,
        paddingRight: 20,
    },
});